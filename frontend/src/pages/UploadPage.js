// frontend/src/pages/UploadPage.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadCSV } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';

const UploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await uploadCSV(data.file[0]);
      setSuccess(response.data.message || 'File uploaded successfully!');
      reset();
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Failed to upload file. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Upload Energy Data</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
          <h2 className="text-lg font-medium mb-4">Upload CSV File</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">CSV File</label>
              <input
                type="file"
                accept=".csv"
                {...register('file', { 
                  required: 'Please select a CSV file',
                  validate: {
                    isCSV: files => 
                      files[0]?.type === 'text/csv' || 
                      files[0]?.name.endsWith('.csv') || 
                      'File must be a CSV'
                  }
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.file && (
                <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Upload a CSV file with your energy consumption data. The file should have 'timestamp' and 'consumption' columns.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : 'Upload CSV'}
            </button>
          </form>
          
          <div className="mt-8">
            <h3 className="font-medium mb-2">CSV Format Requirements:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>File must be in CSV format</li>
              <li>Required columns: 'timestamp', 'consumption'</li>
              <li>Timestamp should be in ISO format (YYYY-MM-DD HH:MM:SS)</li>
              <li>Consumption should be numeric (kWh)</li>
            </ul>
          </div>
          
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p className="font-medium">Example CSV format:</p>
            <pre className="mt-2 text-xs">
              timestamp,consumption<br />
              2023-01-01 00:00:00,12.5<br />
              2023-01-01 01:00:00,10.2<br />
              2023-01-01 02:00:00,9.8
            </pre>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadPage;