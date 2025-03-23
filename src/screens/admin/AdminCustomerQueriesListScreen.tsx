import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ResponseModel from "../../models/response.model";
import { MessageModel } from "../../models/messageInfo.model";
import { getMessageListApi } from "../../services/messageService";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import * as XLSX from 'xlsx';
import { formatJoinedDate, formatTimestamp } from "../../utils/commonUtil";
import { useAuthStore } from "../../store/authStore";
import { logoutApi } from "../../services/authService";

const EXTENSION = '.xlsx';

const AdminCustomerQueriesListScreen: React.FC = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<MessageModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesPerPage = 8;

  const navigate = useNavigate();
  const {authInfo, updateAuthInfo} = useAuthStore((state) => state);

  // Fetch message list from API on component mount
  useEffect(() => {
    setIsLoading(true);
    getMessageListApi()
      .then(({ data }: { data: ResponseModel }) => {
        const messageListResponse = httpResponseHandler(data);
        setMessages(messageListResponse);
        setFilteredMessages(messageListResponse);
      })
      .catch((error) => toast.error("Fetching message list failed"))
      .finally(() => setIsLoading(false));
  }, []);

  // Filter messages when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMessages(messages);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = messages.filter(
        (message) =>
          `${message.firstName} ${message.lastName}`.toLowerCase().includes(lowerCaseQuery) ||
          message.email.toLowerCase().includes(lowerCaseQuery) ||
          message.companyName.toLowerCase().includes(lowerCaseQuery) ||
          message.country.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredMessages(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, messages]);

  // Get current messages for pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const handleLogout = async () => {
    try {
      const { data }: { data: ResponseModel } = await logoutApi({
        id: authInfo?.user.id || "",
        email: authInfo?.user.email || "",
      });

      const logoutResponseData = httpResponseHandler(data);
      updateAuthInfo(null);
      navigate("/admin/login");
    } catch (e) {
      toast.error("Error logging out");
    }
  };


  // Export to excel (mock function)
  const exportToExcel = () => {
    const formattedDataForExcel = messages.map((message: MessageModel, index) => ({
        "#": index + 1,
        "Name": message.firstName + " " + message.lastName,
        "Email": message.email,
        "Company Name": message.companyName,
        "Country": message.country,
        "Phone": message.phone,
        "Sent At": formatJoinedDate(message.createdAt)
    }))

    const worksheet = XLSX.utils.json_to_sheet([]);


    const reportTitle = `Customer Inquiries Report (${formatJoinedDate(formatTimestamp())})`;
    XLSX.utils.sheet_add_aoa(worksheet, [[reportTitle]], { origin: "A1" });

    XLSX.utils.sheet_add_json(worksheet, formattedDataForExcel, { origin: "A2", skipHeader: false });

    const colCount = Object.keys(formattedDataForExcel[0]).length;
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } }];


    const columnWidths = [
        { wch: 5 },   // "#"
        { wch: 20 },  // "Full Name"
        { wch: 35 },  // "Email"
        { wch: 30 },  // "Company Name"
        { wch: 20 },  // "Country"
        { wch: 20 },  // "Phone"
        { wch: 20 }   // "Sent At"
    ];

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");

    // Generate file
    XLSX.writeFile(workbook, `${formatTimestamp()}_customer_inquiries${EXTENSION}`);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Navigate to message details
  const handleMessageClick = (message: MessageModel) => {
    navigate(`${message.id}`);
  };

  // Get full name function
  const getFullName = (message: MessageModel) => {
    return `${message.firstName} ${message.lastName}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-4 px-6 flex justify-between items-center relative">
        <div className="flex items-center">
          <Link to="/admin" className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center mr-3">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h3 className="font-medium">{authInfo?.user.name}</h3>
              <p className="text-sm text-gray-600">{authInfo?.user.email}</p>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mr-4">
          <input
            type="text"
            placeholder="Search messages"
            className="w-96 py-2 px-4 bg-gray-100 rounded-md focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Log Out
        </button>
      </header>

      {/* Main Content */}
      <main className="w-[80%] mx-auto px-4 pt-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Customer Queries</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="w-full overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Company name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Country
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentMessages.length > 0 ? (
                      currentMessages.map((message, index) => (
                        <tr
                          onClick={() => handleMessageClick(message)}
                          key={message.id}
                          className={`hover:bg-gray-50 cursor-pointer ${
                            !message.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {indexOfFirstMessage + index + 1}
                          </td>
                          <td 
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              !message.read 
                                ? "font-bold text-gray-900" 
                                : "font-medium text-gray-900"
                            }`}
                          >
                            {getFullName(message)}
                          </td>
                          <td 
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              !message.read 
                                ? "font-bold text-gray-800" 
                                : "text-gray-500"
                            }`}
                          >
                            {message.email}
                          </td>
                          <td 
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              !message.read 
                                ? "font-bold text-gray-800" 
                                : "text-gray-500"
                            }`}
                          >
                            {message.phone}
                          </td>
                          <td 
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              !message.read 
                                ? "font-bold text-gray-800" 
                                : "text-gray-500"
                            }`}
                          >
                            {message.companyName}
                          </td>
                          <td 
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              !message.read 
                                ? "font-bold text-gray-800" 
                                : "text-gray-500"
                            }`}
                          >
                            {message.country}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No messages found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer / Pagination */}
              <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
                <button
                  onClick={exportToExcel}
                  className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Export excel
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>

                {filteredMessages.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-4">
                      Show {indexOfFirstMessage + 1} to{" "}
                      {Math.min(indexOfLastMessage, filteredMessages.length)} of{" "}
                      {filteredMessages.length}
                    </span>

                    <nav className="flex items-center">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }).map(
                        (_, idx) => {
                          let pageNum: number;

                          // Logic for showing pages around current page
                          if (totalPages <= 5) {
                            pageNum = idx + 1;
                          } else if (currentPage <= 3) {
                            pageNum = idx + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + idx;
                          } else {
                            pageNum = currentPage - 2 + idx;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => paginate(pageNum)}
                              className={`w-8 h-8 mx-1 flex items-center justify-center rounded-md ${
                                currentPage === pageNum
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>TCU Admin Team</p>
      </footer>
    </div>
  );
};

export default AdminCustomerQueriesListScreen;