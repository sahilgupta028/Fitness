/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
// components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import LoginModal from "../Home/LoginModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const openLoginDialog = () => {
    setIsLogin(true);
  };

  const closeLoginDialog = () => {
    setIsLogin(false);
  };

  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 text-white min-w-full z-50 fixed top-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-orange-500 hover:text-orange-400 transition-all duration-300">
              FitLife
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 text-lg font-medium">
            <Link href="/" className="text-white hover:text-orange-400 transition-all duration-300">
              Home
            </Link>
            {status === "authenticated" && (
              <>
                <Link href="/workouts" className="text-white hover:text-orange-400 transition-all duration-300">
                  Workouts
                </Link>
                <Link href="/diet-plans" className="text-white hover:text-orange-400 transition-all duration-300">
                  Diet Plans
                </Link>
                <Link href="/community" className="text-white hover:text-orange-400 transition-all duration-300">
                  Community
                </Link>
              </>
            )}
            <Link href="/store" className="text-white hover:text-orange-400 transition-all duration-300">
              Store
            </Link>
            {status === "authenticated" ? (
              <button
                className="text-white hover:text-orange-400 transition-all duration-300"
                onClick={() => signOut()}
              >
                Logout
              </button>
            ) : (
              <button
                className="text-white hover:text-orange-400 transition-all duration-300"
                onClick={openLoginDialog}
              >
                Sign-In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-orange-400 focus:outline-none"
            >
              {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-gray-900 text-white">
          <div className="flex flex-col items-start space-y-4 py-4 px-4">
            <Link
              href="/"
              className="block text-lg font-medium hover:text-orange-400 transition-all duration-300"
              onClick={toggleMenu}
            >
              Home
            </Link>
            {status === "authenticated" && (
              <>
                <Link
                  href="/workouts"
                  className="block text-lg font-medium hover:text-orange-400 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Workouts
                </Link>
                <Link
                  href="/diet-plans"
                  className="block text-lg font-medium hover:text-orange-400 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Diet Plans
                </Link>
                <Link
                  href="/community"
                  className="block text-lg font-medium hover:text-orange-400 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Community
                </Link>
              </>
            )}
            <Link
              href="/store"
              className="block text-lg font-medium hover:text-orange-400 transition-all duration-300"
              onClick={toggleMenu}
            >
              Store
            </Link>
            {status === "authenticated" ? (
              <button
                className="block text-lg font-medium hover:text-orange-400 transition-all duration-300"
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="block text-lg font-medium hover:text-orange-400 transition-all duration-300"
                onClick={() => {
                  openLoginDialog();
                  toggleMenu();
                }}
              >
                Sign-In
              </button>
            )}
          </div>
        </nav>
      )}

      {isLogin && <LoginModal closeDialog={closeLoginDialog} />}
    </header>
  );
}
