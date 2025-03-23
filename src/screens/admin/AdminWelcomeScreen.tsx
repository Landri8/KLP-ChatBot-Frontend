import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { httpResponseHandler } from '../../utils/responseHandlerUtil';
import { logoutApi } from '../../services/authService';
import ResponseModel from '../../models/response.model';

interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  link: string;
  disable: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({ icon, title, subtitle, link, disable }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(link);
  };

  return (
    <div 
      className={`w-full h-[170px] lg:w-1/3 bg-blue-100 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-blue-200 transition-colors ${disable ? 'bg-zinc-200 opacity-50 hover:bg-zinc-200 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={disable ? undefined : handleClick}
    >
      <div className="text-gray-600 mb-3">
        {icon}
      </div>
      <h2 className="text-lg font-medium text-gray-800 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
};

const AdminWelcomeScreen: React.FC = () => {
  const { authInfo, updateAuthInfo } = useAuthStore((state) => state);
  const navigate = useNavigate();
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
      <header className="bg-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center mr-3">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <h3 className="font-medium">{authInfo?.user.name}</h3>
            <p className="text-sm text-gray-600">{authInfo?.user.email}</p>
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
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">Welcome Back!</h1>
        
        {/* Menu Grid */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
          {/* Customers Queries */}
          <MenuCard
            disable={false}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
            title="Customers Queries"
            link="/admin/queries"
          />
          
          {/* Settings */}
          <MenuCard
            disable={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Settings"
            link="/admin/settings"
          />
          
          {/* Manage Users */}
          <MenuCard
            disable={false}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
            title="Manage Users"
            link="/admin/users"
          />
        </div>

        <div className='flex flex-col lg:flex-row gap-6 justify-center mt-6 max-w-5xl mx-auto'>
            {/* Profile */}
          <MenuCard
            disable={false}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            title="Profile"
            link="/admin/profile"
          />
          
          {/* Achieved */}
          <MenuCard
            disable={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            title="Archived"
            link="/admin/archived"
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>TCU Admin Team</p>
      </footer>
    </div>
  );
};

export default AdminWelcomeScreen;