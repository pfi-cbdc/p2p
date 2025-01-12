// client/src/components/LenderForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';
import api from '../api/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LenderForm = ({ email }) => {
    const [formData, setFormData] = useState({
        // firstName: localStorage.getItem('firstName') || '', // Retrieve first name from localStorage
        email: localStorage.getItem('email') || '',
        aadharCard: [],
        panCard: [],
        gender: '',
        dateOfBirth: '',
        accountStatement: [],
        gstNumber: '',
        employmentStatus: '',
    });
    const [loading, setLoading] = useState(false);
    const [gstError, setGstError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // GST Number validation
        const gstRegex = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z][0-9A-Z]$/;
        if (!gstRegex.test(formData.gstNumber)) {
            setGstError('Invalid GST Number format.');
            return;
        } else {
            setGstError(''); // Clear error if valid
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(file => {
                    formDataToSend.append(key, file);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }
        console.log([...formDataToSend]); // This will log the FormData entries
        try {
            const response = await api.post('/api/lender', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            navigate('/lender-dashboard'); 
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'An error occurred'}`);
            } else {
                alert('Network error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        navigate('/lender-dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Lender Registration</h2>

                <div className="space-y-4">
                <div>
                        <label htmlFor="aadharCard" className="block text-lg font-medium text-gray-700">Aadhar Card</label>
                        <FileUpload 
                            onFileSelect={(file) => setFormData({ ...formData, aadharCard: [...formData.aadharCard, file] })} // Update state with uploaded file
                            multiple={true} // Allow multiple file selection
                        />
                    </div>
                    
                    
                    <div>
                        <label htmlFor="panCard" className="block text-lg font-medium text-gray-700">PAN Card</label>
                        <FileUpload 
                            onFileSelect={(file) => setFormData({ ...formData, panCard: [...formData.panCard, file] })} // Update state with uploaded file
                            multiple={true} // Allow multiple file selection
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-lg font-medium text-gray-700">Gender</label>
                        <select 
                            name="gender" 
                            id="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth" className="block text-lg font-medium text-gray-700">Date of Birth</label>
                        <input 
                            type="date" 
                            name="dateOfBirth" 
                            id="dateOfBirth" 
                            value={formData.dateOfBirth} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="accountStatement" className="block text-lg font-medium text-gray-700">Account Statement</label>
                        <FileUpload 
                            onFileSelect={(file) => setFormData({ ...formData, accountStatement: [...formData.accountStatement, file] })} // Update state with uploaded file
                            multiple={true} // Allow multiple file selection
                        />
                    </div>

                    <div>
                        <label htmlFor="gstNumber" className="block text-lg font-medium text-gray-700">GST Number</label>
                        <input 
                            type="text" 
                            name="gstNumber" 
                            id="gstNumber" 
                            placeholder="GST Number"
                            value={formData.gstNumber} 
                            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })} 
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                            required 
                        />
                        {gstError && <p className="text-red-500 text-sm mt-1">{gstError}</p>} {/* Error message */}
                    </div>

                    <div>
                        <label htmlFor="employmentStatus" className="block text-lg font-medium text-gray-700">Employment Status</label>
                        <select 
                            name="employmentStatus" 
                            id="employmentStatus" 
                            value={formData.employmentStatus} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                            required
                        >
                            <option value="">Select Employment Status</option>
                            <option value="self-employed">Self-Employed</option>
                            <option value="salaried">Salaried</option>
                            <option value="business">Business</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button 
                        type="button" 
                        onClick={handleSkip}
                        className="w-1/3 px-4 py-2 mt-4 font-semibold text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none"
                    >
                        Skip
                    </button>
                    <button 
                        type="submit" 
                        className="w-1/3 px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Submitting...
                            </span>
                        ) : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LenderForm;
