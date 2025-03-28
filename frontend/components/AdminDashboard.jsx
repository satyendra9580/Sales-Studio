import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const URL = import.meta.env.VITE_URL;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [qrGenerated, setQrGenerated] = useState(0);

  useEffect(() => {
    // Fetch users
    fetch(`${URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));

    // Fetch venues
    fetch(`${URL}/api/venues`)
      .then((res) => res.json())
      .then((data) => setVenues(data))
      .catch((err) => console.error('Error fetching venues:', err));

    // Fetch the count of QR generated persons
    fetch(`${URL}/api/qr-generated`)
      .then((res) => res.json())
      .then((data) => setQrGenerated(data.count))
      .catch((err) => {
        console.error('Error fetching QR generated persons:', err);
        // Optionally fallback to a default value if endpoint isn't available.
        setQrGenerated(venues.length);
      });
  }, []);

  // Prepare the chart data with an additional bar for "QR Generated Persons"
  const chartData = {
    labels: ['Users', 'Venues', 'QR Generated Persons'],
    datasets: [
      {
        label: 'Counts',
        data: [users.length, venues.length, qrGenerated],
        backgroundColor: [
          'rgba(59,130,246,0.7)',    // Users (blue)
          'rgba(16,185,129,0.7)',    // Venues (green)
          'rgba(139,92,246,0.7)',     // QR Generated Persons (purple)
        ],
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-lg text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">{users.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-lg text-gray-600">Total Venues</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">{venues.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-lg text-gray-600">QR Generated Persons</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">{qrGenerated}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Data Overview</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
