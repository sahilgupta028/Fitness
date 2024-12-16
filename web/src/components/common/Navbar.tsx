"use client";
// components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 text-white w-full z-50">
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
            <Link href="/about" className="text-white hover:text-orange-400 transition-all duration-300">
              About
            </Link>
            <Link href="/workouts" className="text-white hover:text-orange-400 transition-all duration-300">
              Workouts
            </Link>
            <Link href="/diet-plans" className="text-white hover:text-orange-400 transition-all duration-300">
              Diet Plans
            </Link>
            <Link href="/community" className="text-white hover:text-orange-400 transition-all duration-300">
              Community
            </Link>
            <Link href="/store" className="text-white hover:text-orange-400 transition-all duration-300">
              Store
            </Link>
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
        <nav className="md:hidden bg-gray-900 text-white p-4">
          <div className="space-y-4">
            <Link
              href="/"
              className="block hover:text-orange-400 transition-all duration-300 py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block hover:text-orange-400 transition-all duration-300 py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/workouts"
              className="block hover:text-orange-400 transition-all duration-300 py-2"
              onClick={toggleMenu}
            >
              Workouts
            </Link>
            <Link
              href="/diet-plans"
              className="block hover:text-orange-400 transition-all duration-300 py-2"
              onClick={toggleMenu}
            >
              Diet Plans
            </Link>
            <Link
              href="/community"
              className="block hover:text-orange-400 transition-all duration-300 py-2"
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link
              href="/store"
              className="block hover:text-orange-400 transition-all duration-300 py-2"
              onClick={toggleMenu}
            >
              Store
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
