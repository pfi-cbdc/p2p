import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [view, setView] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.post('http://localhost:5001/api/admin/dashboard', {}, { withCredentials: true });
                setResponse(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

    const fetchUsers = async () => {
       try{
            const res = await axios.get('http://localhost:5001/api/users/all', {
                withCredentials: true
            });
            if(res.status === 200){
                setResponse(prev => ({ ...prev, users: res.data}))
            }
        }catch(error){
            console.error("Error fetching users: ", error)
        }
    };


    const renderUsers = () => {
        if (!response?.users) return <p>No users available.</p>;

        return (
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Users List</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">First Name</th>
                            <th className="border px-4 py-2">Last Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.users.map((user) => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2">{user.firstName}</td>
                                <td className="border px-4 py-2">{user.lastName}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };


    /* invoices fetch krne wala kaam*/
       const fetchInvoices = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/invoices/all', { withCredentials: true });
            if (res.status === 200) {
                setResponse(prev => ({ ...prev, invoices: res.data }));
            }
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };

    const renderInvoices = () => {
        if (!response?.invoices) return <p>No invoices available.</p>;

        return (
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Invoice List</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">First Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Invoice</th>
                            <th className="border px-4 py-2">Type of Business</th>
                            <th className="border px-4 py-2">Tenure of Invoice</th>
                            <th className="border px-4 py-2">Interest Rate</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.invoices.map((invoice) => (
                            <tr key={invoice._id}>
                                <td className="border px-4 py-2">{invoice.firstName}</td>
                                <td className="border px-4 py-2">{invoice.email}</td>
                                <td className="border text-blue-700 px-4 py-2">
                                    <a href={invoice.fileUpload} target="_blank" rel="noopener noreferrer">View File</a>
                                </td>
                                <td className="border px-4 py-2">{invoice.typeOfBusiness}</td>
                                <td className="border px-4 py-2">{invoice.tenureOfInvoice}</td>
                                <td className="border px-4 py-2">{invoice.interestRate}</td>
                                <td className="border px-4 py-2">{invoice.status || 'Pending'}</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        Accept
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const fetchBorrowers = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/borrower/all', { withCredentials: true });
            if (res.status === 200) {
                setResponse(prev => ({ ...prev, borrowers: res.data }));
            }
        } catch (error) {
            console.error("Error fetching borrowers:", error);
        }
    };

    const renderBorrowers = () => {
        if (!response?.borrowers) return <p>No borrowers available.</p>;

        return (
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Borrowers List</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                        <th className="border px-4 py-2">First Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Aadhar Card</th>
                            <th className="border px-4 py-2">PAN Card</th>
                            <th className="border px-4 py-2">Gender</th>
                            <th className="border px-4 py-2">Account Statement</th>
                            <th className="border px-4 py-2">GST Number</th>
                            <th className="border px-4 py-2">Date of Birth</th>
                            <th className="border px-4 py-2">Type of Business</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.borrowers.map((borrower) => (
                            <tr key={borrower._id}>
                                <td className="border px-4 py-2">{borrower.firstName}</td>
                                <td className="border px-4 py-2">{borrower.email}</td>
                                <td className="border px-4 py-2 text-blue-600"><a href={borrower.aadharCard.join(', ')} target="_blank" rel="noopener noreferrer">View File</a></td>
                                <td className="border px-4 py-2 text-blue-600"><a href={borrower.panCard.join(', ')} target="_blank" rel="noopener noreferrer">View File</a></td>
                                <td className="border px-4 py-2">{borrower.gender}</td>
                                <td className="border px-4 py-2 text-blue-600"><a href={borrower.accountStatement.join(', ')} target="_blank" rel="noopener noreferrer">View File</a></td>
                                <td className="border px-4 py-2">{borrower.gstNumber}</td>
                                <td className="border px-4 py-2">{new Date(borrower.dateOfBirth).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{borrower.typeOfBusiness}</td>
                                <td className="border px-4 py-2">{borrower.status || 'Pending'}</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        Accept
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderContent = () => {
        if (loading) return <p>Loading...</p>;
        if (!response) return <p>No data available.</p>;

        switch (view) {
            case 'users':
                return renderUsers();
            case 'borrowers':
                return renderBorrowers();
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
            case 'invoices':
                return renderInvoices();
            default:
                return <p className="text-gray-500">Select an option to view details.</p>;
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5001/api/admin/logout', {}, { withCredentials: true });
            window.location.href = '/login';
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex justify-between items-center p-4 bg-zinc-600 text-white">
                <h1 className="text-xl">Welcome, {response ? response.adminName : "Admin"}!</h1>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md">Logout</button>
            </div>
            <div className="flex min-h-screen">
                <div className="w-1/6 bg-zinc-200 text-white p-6">
                    <button onClick={() => setView('users') || fetchUsers()} className="w-full text-left mb-4 p-2 bg-blue-700 hover:bg-blue-600 rounded-md">Users</button>
                    <button onClick={() => { setView('borrowers'); fetchBorrowers(); }} className="w-full text-left mb-4 p-2 bg-blue-700 hover:bg-blue-600 rounded-md">Borrowers</button>
                    <button onClick={() => setView('lenders')} className="w-full text-left mb-4 p-2 bg-blue-700 hover:bg-blue-600 rounded-md">Lenders</button>
                    <button onClick={() => setView('invoices') || fetchInvoices()} className="w-full text-left mb-4 p-2 bg-blue-700 hover:bg-blue-600 rounded-md">Invoices</button>
                </div>
                <div className="w-5/6 p-6">{renderContent()}</div>
            </div>
        </div>
    );
};

export default AdminDashboard;
