import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Import Home component
import LenderForm from './components/LenderForm';
import BorrowerForm from './components/BorrowerForm';
import LenderDashboard from './components/LenderDashboard';
import BorrowerDashboard from './components/BorrowerDashboard';
import Registration from './components/RegisterForm.jsx';
import Login from './components/LoginForm.jsx';
import RoleSelector from './components/RoleSelector.js' // Import Login component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './App.css';
import AdminLogin from './components/Admin.js';
import AdminDashboard from './components/AdminDashboard.jsx';
import AdminProtectedRoute from './components/AdminProtectedRoute.js';

function Root() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-pfi-2406');

  return (
    <div className="App">
        {!isAdminRoute && <Navbar />}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/role" element={<RoleSelector />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} /> 
          <Route 
            path="/lender" 
            element={
              <ProtectedRoute>
                <LenderForm email={localStorage.getItem('email')} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/borrower" 
            element={
              <ProtectedRoute>
                <BorrowerForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lender-dashboard" 
            element={
              <ProtectedRoute>
                <LenderDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/borrower-dashboard" 
            element={
              <ProtectedRoute>
                <BorrowerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path='/admin-pfi-2406' element={<AdminLogin />} />
          <Route 
            path='/admin-pfi-2406/dashboard' 
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } 
          />
        </Routes>
      </div>
  );
}

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

export default App;
