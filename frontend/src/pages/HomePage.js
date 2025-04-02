// frontend/src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Energy Consumption</h1>
                <p className="text-xl mb-8">
                  Upload your energy data, visualize consumption patterns, and make informed decisions to reduce your energy footprint.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/register" 
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold text-center hover:bg-blue-100"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/about" 
                    className="border border-white text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-blue-700"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/images/dashboard-preview.png" 
                  alt="Energy dashboard preview" 
                  className="rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Energy+Dashboard';
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">CSV Upload</h3>
                <p className="text-gray-600">
                  Easily upload your energy consumption data in CSV format for analysis and visualization.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Charts</h3>
                <p className="text-gray-600">
                  Visualize your energy usage with interactive and informative charts that help identify patterns.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Data Analysis</h3>
                <p className="text-gray-600">
                  Get insights and trends from your energy consumption patterns to make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to start tracking your energy usage?</h2>
            <p className="text-xl mb-8">Join thousands of users who are making smarter energy decisions.</p>
            <Link 
              to="/register" 
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-100 inline-block"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Energy Tracker</h3>
              <p className="text-gray-400">© 2023 All rights reserved</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400">Terms of Service</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;