import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ResponseModel from "../../models/response.model";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import { getUserListApi } from "../../services/userService";
import { UserModel } from "../../models/userinfo.model";
import { useAuthStore } from "../../store/authStore";
import { logoutApi } from "../../services/authService";


const AdminUserListScreen: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const usersPerPage = 8;
  const { authInfo, updateAuthInfo } = useAuthStore((state) => state);

  const navigate = useNavigate();

  // Fetch user list from API on component mount
  useEffect(() => {
    setIsLoading(true);
    getUserListApi()
      .then(({ data }: { data: ResponseModel }) => {
        const userListResponse = httpResponseHandler(data);
        setUsers(userListResponse);
        setFilteredUsers(userListResponse);
      })
      .catch((error) => toast.error("Fetching user list failed"))
      .finally(() => setIsLoading(false));
  }, []);

  // Filter users when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery) ||
          user.id.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, users]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Navigate to user details
  const handleUserClick = (user: UserModel) => {
    navigate(`${user.id}`);
  };

  // Helper function to format role
  const getRoleName = (roleId: string): string => {
    switch (roleId) {
      case "1":
        return "Admin";
      case "2":
        return "Staff";
      default:
        return "Unknown";
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return "Invalid date";
    
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    return `${day}/${month}/${year}`;
  };

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
            placeholder="Search users"
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
          <h1 className="text-2xl font-bold">User Management</h1>
          <button 
            onClick={() => navigate('/admin/users/create')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New User
          </button>
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
                        User ID
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
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${user.role === "1" ? "bg-purple-100 text-purple-800" : 
                                user.role === "2" ? "bg-green-100 text-green-800" : 
                                "bg-blue-100 text-blue-800"}`}
                            >
                              {getRoleName(user.role)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleUserClick(user)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              {user.id != authInfo?.user.id && (
                                <button 
                                onClick={() => {
                                    if (user.role === "1") {
                                    toast.error("Cannot delete admin user");
                                    return;
                                    }
                                    toast.success(`User ${user.name} would be deleted`);
                                }}
                                className={`${user.role === "1" ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:text-red-900"}`}
                                >
                                Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer / Pagination */}
              <div className="px-6 py-4 flex justify-end items-center border-t border-gray-200">
                {filteredUsers.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-4">
                      Show {indexOfFirstUser + 1} to{" "}
                      {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                      {filteredUsers.length}
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

export default AdminUserListScreen;