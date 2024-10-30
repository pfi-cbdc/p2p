import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await axios.post('http://localhost:5001/api/admin/me', {}, { withCredentials: true });
                if (response.status === 200) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAdmin) {
        return <Navigate to="/admin-pfi-2406" />;
    }

    return children;
};

export default AdminProtectedRoute;
