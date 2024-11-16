import { useEffect, useState } from "react";
import api from '../api/axios';

const ClosedInvoices = () => {
    const [response, setResponse] = useState(null);
    const fetchClosedInvoices = async () => {
        try {
            const response = await api.get(`/api/invoice/closed/${localStorage.getItem("email")}`);
            setResponse(response.data);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };
    useEffect(()=>{
        fetchClosedInvoices();
    }, []);
    
    const renderClosedInvoices = () => {
        if (!response) return <p>No invoices available.</p>;

        return (
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Invoice List</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Invoice ID</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Fulfilled By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response
                            .map((invoice) => (
                                <tr key={invoice._id}>
                                    <td className="border px-4 py-2">{invoice._id}</td>
                                    <td className="border px-4 py-2">{invoice.amount}</td>
                                    <td className="border px-4 py-2">{invoice.lenderID}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    };
    return (
        <div>
            {renderClosedInvoices()}
        </div>
    );
}

export default ClosedInvoices;