// frontend/src/pages/LoginPage.js
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login as loginUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  useEffect(() => {
    // Check if there's a message from registration
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await loginUser(data.username, data.password);
      
      if (response.data.access) {
        login(response.data.access, data.username);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
          
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                {...register('username', { required: 'Username is required' })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;