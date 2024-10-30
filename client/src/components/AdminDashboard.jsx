import { useEffect, useState } from "react";
import axios from 'axios';

const AdminDashboard = () => {
    const [view, setView] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/admin/dashboard');
                setResponse(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

    const renderContent = () => {
        if (loading) return <p>Loading...</p>;
        if (!response) return <p>No data available.</p>;

        switch (view) {
            case 'users':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">User List</h2>
                        <ul className="space-y-2">
                            {response.users.map((user) => (
                                <li key={user.id} className="p-2 bg-gray-100 rounded-md">
                                    {user.firstName} - {user.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'lenders':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Lender List</h2>
                        <ul className="space-y-2">
                            {response.lenders.map((user) => (
                                <li key={user.id} className="p-2 bg-gray-100 rounded-md">
                                    {user.name} - {user.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'borrowers':
                return (
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Borrower List</h2>
                        <ul className="space-y-2">
                            {response.borrowers.map((user) => (
                                <li key={user.id} className="p-2 bg-gray-100 rounded-md">
                                    {user.name} - {user.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return <p className="text-gray-500">Select an option to view details.</p>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="w-1/6 bg-zinc-200 text-white p-6">
                <button
                    onClick={() => setView('users')}
                    className="w-full text-left mb-4 p-2 bg-blue-700 hover:bg-blue-600 rounded-md"
                >
                    Users
                </button>
                <button
                    onClick={() => setView('lenders')}
                    className="w-full text-left mb-4 p-2 bg-blue-700 hover:bg-blue-600 rounded-md"
                >
                    Lenders
                </button>
                <button
                    onClick={() => setView('borrowers')}
                    className="w-full text-left mb-4 p-2 bg-blue-700 hover:bg-blue-600 rounded-md"
                >
                    Borrowers
                </button>
            </div>

            <div className="w-5/6 p-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
