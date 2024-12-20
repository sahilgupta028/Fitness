"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import LoginModal from '../Home/LoginModal';

const LoginRequired = () => {

  const [isLogin, setIsLogin] = useState(false);

  const openLoginDialog = () => {
    setIsLogin(true);
  };

  const closeLoginDialog = () => {
    setIsLogin(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
              <div className="bg-white p-8 rounded-lg text-center max-w-md">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/login-required.webp"
                    alt="Login Required"
                    width={350}
                    height={200}
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Access Restricted
                </h1>
                <p className="text-gray-600 mb-6">
                  You need to log in to view this page. Please sign in to continue.
                </p>
                <button
                className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-500 transition duration-300"
                onClick={openLoginDialog}
              >
                Go To Login
              </button>
              </div>

              {isLogin && <LoginModal closeDialog={closeLoginDialog} />}
            </div>
  )
}

export default LoginRequired;