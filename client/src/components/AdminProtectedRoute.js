import { useEffect, useState } from 'react';
import UnauthorizedAccess from './UnauthorizedAccess'
import api from '../api/axios';

const AdminProtectedRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await api.post('/api/admin/me');
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
        return <UnauthorizedAccess />
    }

    return children;
};

export const AdminLoginProtection = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await api.post('/api/admin/verify-user');
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
        return <UnauthorizedAccess />
    }

    return children;
}

export default AdminProtectedRoute;
