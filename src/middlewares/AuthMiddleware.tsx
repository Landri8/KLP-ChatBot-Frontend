import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AuthMiddleware = () => {
    const {authInfo, updateAuthInfo} = useAuthStore((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authInfo || Object.keys(authInfo).length === 0) {
            navigate("/admin/login");
            return;
        }
    }, [authInfo, navigate]);


    return <Outlet />;
};

export default AuthMiddleware;
