import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://github.com" className="text-gray-400 hover:text-gray-500" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Zata. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
