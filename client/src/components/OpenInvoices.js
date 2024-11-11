import { useEffect, useState } from "react";
import api from '../api/axios';
const OpenInvoices = () => {
    const [response, setResponse] = useState(null);
    const [amount, setAmount] = useState(1);
    const fetchInvoices = async () => {
        try {
            const res = await api.get('/api/invoices/all');
            if (res.status === 200) {
                setResponse(prev => ({ ...prev, invoices: res.data }));
            }
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };
    useEffect(()=>{
        fetchInvoices();
    }, []);
    const renderInvoices = () => {
        if (!response?.invoices) return <p>No invoices available.</p>;

        return (
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Invoice List</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">First Name</th>
                            <th className="border px-4 py-2">Last Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Invoice</th>
                            <th className="border px-4 py-2">Type of Business</th>
                            <th className="border px-4 py-2">Tenure of Invoice</th>
                            <th className="border px-4 py-2">Interest Rate</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Custom Amount</th>
                            <th className="border px-4 py-2">Pay Now!</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.invoices
                            .filter((invoice) => invoice.verified === 1)
                            .map((invoice) => (
                                <tr key={invoice._id}>
                                    <td className="border px-4 py-2">{invoice.firstName}</td>
                                    <td className="border px-4 py-2">{invoice.lastName}</td>
                                    <td className="border px-4 py-2">{invoice.email}</td>
                                    <td className="border text-blue-700 px-4 py-2">
                                        <a href={invoice.fileUpload} target="_blank" rel="noopener noreferrer">View File</a>
                                    </td>
                                    <td className="border px-4 py-2">{invoice.typeOfBusiness}</td>
                                    <td className="border px-4 py-2">{invoice.tenureOfInvoice}</td>
                                    <td className="border px-4 py-2">{invoice.interestRate}</td>
                                    <td className="border px-4 py-2">Accepted</td>
                                    <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="border px-2 py-1"
                                    />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button onClick={async (e) => {
                                        e.preventDefault();
                                        const { data: { key } } = await api.get("/api/getkey")
                                        const { data: { order } } = await api.post("/api/razor/checkout", {
                                            amount: Number(amount)
                                        })
                                        const options = {
                                            key,
                                            amount: order.amount,
                                            currency: "INR",
                                            name: "P-Fi",
                                            description: "Payment to P-fi",
                                            image: "/public/favicon.ico",
                                            order_id: order.id,
                                            notes: {
                                                address: "P-fi Office",
                                                invoiceID: invoice._id,
                                                lenderEmail: localStorage.getItem('email')
                                            },
                                            callback_url: "https://pfi-dwxi.onrender.com/api/razor/paymentverification",
                                            prefill: {
                                                name: "P-Fi",
                                                email: "someone@somewhere.com",
                                                contact: "********46"
                                            },
                                            theme: {
                                                "color": "#121212"
                                            }
                                        };
                                        const razor = new window.Razorpay(options);
                                        razor.open();
                                        }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Pay
                                        </button>
                                    </td>
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
            {renderInvoices()}
        </div>
    );
}

export default OpenInvoices;