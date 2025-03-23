import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserUpdateFormData,
  userUpdateFormSchema,
} from "../../schemas/UserUpdateFormSchema";
import {
  deleteUserApi,
  getUserDetailsApi,
  updateUserApi,
} from "../../services/userService";
import ResponseModel from "../../models/response.model";
import { httpResponseHandler } from "../../utils/responseHandlerUtil";
import { useAuthStore } from "../../store/authStore";
import { logoutApi } from "../../services/authService";

const AdminUserDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { authInfo, updateAuthInfo } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateFormSchema),
  });

  // Format date helper
  const formatDate = (dateString: string): string => {
    if (!dateString || dateString.length !== 8) return "Invalid date";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${day}/${month}/${year}`;
  };

  // Get role name helper
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

  // Fetch user data
  useEffect(() => {
    if (!id) {
      navigate("/admin/users");
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);

      getUserDetailsApi(id)
        .then(({ data }: { data: ResponseModel }) => {
          const getUserDetailsResponseData = httpResponseHandler(data);

          setValue("name", getUserDetailsResponseData.name);
          setValue("email", getUserDetailsResponseData.email);
          setValue("role", getUserDetailsResponseData.role);
        })
        .catch((error: any) => {
          console.log(error);
          toast.error("Failed to load user data");
          navigate("/admin/users");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchUser();
  }, [id, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data: UserUpdateFormData) => {
    try {
      setIsSubmitting(true);

      const updateData = {
        name: data.name,
        email: data.email,
        role: data.role,
      };

      const { data: responseData }: { data: ResponseModel } =
        await updateUserApi(updateData);
      console.log(responseData);
      const updateResponseData = httpResponseHandler(responseData);
      toast.success(responseData.message);
      reset();
      navigate("/admin/users");
    } catch (error: Error | any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { data: responseData }: { data: ResponseModel } =
        await deleteUserApi({
          id: id || "",
        });

      const deleteResponseData = httpResponseHandler(responseData);
      toast.success("User deleted successfully");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
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
      <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <Link to="/admin/users" className="mr-4">
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
      <main className="w-[80%] max-w-3xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">User Details</h1>
                <p className="text-gray-600">
                  View and manage user information
                </p>
              </div>

              {authInfo?.user.id != id && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete User
                </button>
              )}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* User ID and Created Date (non-editable) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      User ID
                    </label>
                    <input
                      type="text"
                      value={id}
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Created Date
                    </label>
                    <input
                      type="text"
                      value="24/02/2025" // This would be formatDate(user.createdAt) with real data
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Role Selection */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    {...register("role")}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.role ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                  >
                    <option value="2">Staff</option>
                    <option value="1">Admin</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3">
                  <Link
                    to="/admin/users"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete User
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this user? All data will
                        be permanently removed. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>TCU Admin Team</p>
      </footer>
    </div>
  );
};

export default AdminUserDetailsScreen;
