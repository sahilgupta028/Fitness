// components/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-500">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-all duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/workouts" className="hover:text-orange-400 transition-all duration-300">
                  Workouts
                </Link>
              </li>
              <li>
                <Link href="/diet-plans" className="hover:text-orange-400 transition-all duration-300">
                  Diet Plans
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-orange-400 transition-all duration-300">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-orange-400 transition-all duration-300">
                  Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-500">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                className="text-white hover:text-orange-400 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-white hover:text-orange-400 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-white hover:text-orange-400 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-white hover:text-orange-400 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-500">Stay Updated</h3>
            <p className="mb-4">Get the latest workouts, diet plans, and fitness tips directly to your inbox!</p>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md text-gray-800 w-2/3 focus:outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-400 text-white p-2 rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FitLife. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
