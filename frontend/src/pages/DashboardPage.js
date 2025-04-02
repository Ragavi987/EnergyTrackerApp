// frontend/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getEnergyData, getStatistics } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';

// Register Chart.js components
Chart.register(...registerables);

const DashboardPage = () => {
  const [period, setPeriod] = useState('monthly');
  const [energyData, setEnergyData] = useState([]);
  const [statistics, setStatistics] = useState({
    total_consumption: 0,
    average_daily: 0,
    peak_consumption: { value: 0, timestamp: null },
    estimated_cost: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [dataResponse, statsResponse] = await Promise.all([
          getEnergyData(period),
          getStatistics()
        ]);
        
        setEnergyData(dataResponse.data);
        setStatistics(statsResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  // Prepare chart data
  const chartData = {
    labels: energyData.map(item => item.name || item.hour),
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: energyData.map(item => item.consumption),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Sample data for device breakdown (in a real app, this would come from the API)
  const deviceData = {
    labels: ['HVAC', 'Lighting', 'Refrigeration', 'Electronics', 'Water Heating', 'Other'],
    datasets: [
      {
        label: 'Consumption by Device',
        data: [35, 20, 15, 10, 12, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          <div className="flex items-center space-x-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Total Consumption</h3>
                <p className="text-2xl font-bold">{statistics.total_consumption} kWh</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Average Daily Usage</h3>
                <p className="text-2xl font-bold">{statistics.average_daily} kWh</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Peak Consumption</h3>
                <p className="text-2xl font-bold">{statistics.peak_consumption.value} kWh</p>
                <p className="text-xs text-gray-500">
                  {statistics.peak_consumption.timestamp ? 
                    new Date(statistics.peak_consumption.timestamp).toLocaleString() : 
                    'No data'}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Estimated Cost</h3>
                <p className="text-2xl font-bold">${statistics.estimated_cost}</p>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Energy Consumption</h3>
                <div className="h-80">
                  {period === 'monthly' ? (
                    <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                  ) : (
                    <Line data={chartData} options={{ maintainAspectRatio: false }} />
                  )}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Consumption by Device</h3>
                <div className="h-80">
                  <Pie data={deviceData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;