import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import AuthInfoModel from "../../models/userinfo.model";
import ResponseModel from "../../models/response.model";
import { logoutApi } from "../../services/authService";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";


const AdminProfileScreen: React.FC = () => {
  const {authInfo, updateAuthInfo} = useAuthStore((state) => state);
  const [profile, setProfile] = useState<AuthInfoModel | null>(authInfo);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Get user role name
  const getRoleName = (roleId: string): string => {
    switch (roleId) {
      case "1":
        return "Admin";
      case "2":
        return "Staff";
      default:
        return "User";
    }
  };

  // Format date (YYYYMMDD to DD/MM/YYYY)
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return "Invalid date";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${day}/${month}/${year}`;
  };

  // Handle logout
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-500 hover:text-red-700 font-medium"
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
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : profile ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="bg-blue-50 px-6 py-8 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile?.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold">{profile?.user.name}</h2>
                  <div className="flex items-center mt-1">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${
                        profile?.user.role === "1"
                          ? "bg-purple-100 text-purple-800"
                          : profile?.user.role === "2"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {getRoleName(profile?.user.role)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      Since {formatDate(profile?.user.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="px-6 py-6">
              <h3 className="text-lg font-semibold mb-4">
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">User ID</p>
                  <p className="font-medium">{profile?.user.id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="font-medium">{profile?.user.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium">{profile?.user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Role</p>
                  <p className="font-medium">
                    {getRoleName(profile?.user.role)}
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard Link */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => navigate("/admin")}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Profile not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfileScreen;
