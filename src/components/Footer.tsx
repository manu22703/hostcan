import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Server className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold text-white">HostCan</span>
            </Link>
            <p className="mt-4">
              Professional web hosting and cloud storage solutions for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/hosting" className="hover:text-green-500">Web Hosting</Link></li>
              <li><Link to="/cloud" className="hover:text-green-500">Cloud Storage</Link></li>
              <li><Link to="/domains" className="hover:text-green-500">Domains</Link></li>
              <li><Link to="/ssl" className="hover:text-green-500">SSL Certificates</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-green-500">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-green-500">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-green-500">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-green-500">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-500">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 HostCan. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-green-500">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-green-500">Terms of Service</Link>
              <Link to="/legal" className="hover:text-green-500">Legal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}