import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
