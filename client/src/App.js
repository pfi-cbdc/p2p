import React, { useEffect } from 'react';
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
import ResetPassword from './components/ResetPassword.js';
import AdminProtectedRoute, { AdminLoginProtection } from './components/AdminProtectedRoute.js';
import ResetMailPassword from './components/ResetMailPassword.js';
import WaitingPage from './components/WaitingPage';
import PaymentSuccess from './components/PaymentSuccess';
import Payments from './components/Payments';

function Root() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-pfi-2406');

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    var Tawk_LoadStart = new Date();
    // eslint-disable-next-line no-use-before-define
    var Tawk_API = Tawk_API || {};
    
    (function() {
      var s1 = document.createElement("script");
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6728e6bc4304e3196adce996/1ibrsakqa';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      var s0 = document.getElementsByTagName("script")[0];
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <div className="App">
        {!isAdminRoute && <Navbar />}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/role" element={<RoleSelector />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/reset-pass" element={<ResetPassword />} /> 
          <Route path="/reset-password" element={<ResetMailPassword />} /> 
          <Route path="/waiting" element={<WaitingPage />} />
          <Route 
            path="/paymentsuccess" 
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lender-payments" 
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            } 
          />
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
                <BorrowerForm email={localStorage.getItem('email')} />
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
          <Route 
            path='/admin-pfi-2406' 
            element={
              <AdminLoginProtection>
                <AdminLogin />
              </AdminLoginProtection>
            } 
          />
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
