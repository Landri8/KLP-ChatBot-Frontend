import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getMessageDetailsApi, sendReplyApi, updateMessageToMarkReadApi } from '../../services/messageService';
import ResponseModel from '../../models/response.model';
import { httpResponseHandler } from '../../utils/responseHandlerUtil';
import MessageInfoModel from '../../models/messageInfo.model';
import toast from 'react-hot-toast';
import { formatJoinedDate } from '../../utils/commonUtil';
import { useAuthStore } from '../../store/authStore';


const AdminCustomerQueryDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const authInfo = useAuthStore((state) => state.authInfo);
  const { id } = useParams<{ id: string }>();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  // Refs for auto-focus and scrolling
  const [isLoading, setIsLoading] = useState(false);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const replyFormRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState<MessageInfoModel | null>(null);

  
  const handleMarkAsRead = async () => {
    try {
      const {data: responseData} : {data: ResponseModel} = await updateMessageToMarkReadApi({id : id || ""});
      const markedMessageResponseData = httpResponseHandler(responseData);

      toast.success("Marked as read successfully");
      setMessage(markedMessageResponseData);

    } catch (e) {
      toast.error("Failed updating message")
      console.log(e);
    }
  };
  
  const handleReply = () => {
    setIsReplying(true);
  };
  
  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText('');
  };
  
  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsReplying(true);
    toast.loading("Replying...");
    try {
      const {data: responseData}: {data: ResponseModel} = await sendReplyApi({messageId: id || "", replyText: replyText});
      const sendResponseData = httpResponseHandler(responseData);
      toast.remove();
      toast.success(responseData.message);
      navigate('/admin/queries');
    } catch (e) {
      toast.remove();
      toast.error("Failed sending reply");
      throw e;
    } finally {
      setIsReplying(false);
    }
  };

  // Effect for auto-focus and scrolling when reply form is opened
  useEffect(() => {
    if (isReplying && replyTextareaRef.current && replyFormRef.current) {
      // Focus on the textarea
      replyTextareaRef.current.focus();
      
      // Scroll to the reply form
      replyFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isReplying]);

  useEffect(() => {
    setIsLoading(true);
    getMessageDetailsApi(id || "").then(
      ({data}: {data: ResponseModel}) => {

        const getMessageInfoResponseData = httpResponseHandler(data);
        setMessage(getMessageInfoResponseData);
      }
    ).catch((error: any) => {
      console.log(error);
      toast.error("Fetching question details failed")
    })
    .finally(() => setIsLoading(false));
  }, [])
  
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
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
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReply}
            disabled={isReplying}
            className={`flex items-center ${
              isReplying 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-4 py-2 rounded-md transition-colors`}
          >
            Reply
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          
          {message?.read ? (
            <button
              disabled
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-30"
            >
              Have Read
            </button>
          )
          :
          (
            <button
              onClick={handleMarkAsRead}
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Mark as read
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
            </button>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      {
        isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )
        :
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Message Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">{message?.jobTitle}</h1>
            <p className="text-gray-600">{message?.createdAt ? formatJoinedDate(message?.createdAt): ""}</p>
          </div>
          
          {/* Message Content */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{message?.jobDetails}</p>
            </div>
            
            <hr className="my-6 border-gray-200" />
            
            {/* Contact Information */}
            <div className="text-sm text-gray-700">
              <p><strong>Name:</strong> {message?.firstName} {message?.lastName}</p>
              <p><strong>Email:</strong> {message?.email}</p>
              <p><strong>Phone Number:</strong> {message?.phone}</p>
              <p><strong>Company Name:</strong> {message?.companyName}</p>
              <p><strong>Country:</strong> {message?.country}</p>
            </div>
          </div>
          
          {/* Reply Form */}
          {isReplying && (
            <div ref={replyFormRef} className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Reply to {message?.firstName} {message?.lastName}</h2>
              <form onSubmit={handleSubmitReply}>
                <div className="mb-4">
                  <textarea
                    ref={replyTextareaRef}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={8}
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancelReply}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Send Reply
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      }
      
      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>TCU Admin Team</p>
      </footer>
    </div>
  );
};

export default AdminCustomerQueryDetailsScreen;