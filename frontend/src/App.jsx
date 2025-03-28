import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import Sidebar from '../components/Sidebar';
import Users from '../components/Users';
import Venues from '../components/Venues';
function App() {
  return (
    <Router>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Main content */}
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/venues" element={<Venues />} />
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  </Router>
  )
} 
export default App;
