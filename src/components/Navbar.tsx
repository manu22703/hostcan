import React from 'react';
import { Link } from 'react-router-dom';
import { Server } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Server className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">HostCan</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-green-600">
              Dashboard
            </Link>
            <Link to="/cloud" className="text-gray-700 hover:text-green-600">
              Cloud Storage
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-green-600 hover:bg-green-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}