import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Import Home component
import LenderForm from './components/LenderForm';
import BorrowerForm from './components/BorrowerForm';
import LenderDashboard from './components/LenderDashboard';
import BorrowerDashboard from './components/BorrowerDashboard';
import Register from './components/Register'; // Import Register component
import Login from './components/Login'; // Import Login component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/lender" element={<LenderForm />} />
          <Route path="/borrower" element={<BorrowerForm />} />
          <Route path="/lender-dashboard" element={<LenderDashboard />} />
          <Route path="/borrower-dashboard" element={<BorrowerDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
