import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const BorrowerWallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchWalletDetails = async () => {
            try {
                const email = localStorage.getItem('email'); 
                const response = await api.get(`/api/borrower/status?email=${email}`);
                if (response.data.exists) {
                    const walletResponse = await api.get(`/api/wallet/borrower/${email}`);
                    setBalance(walletResponse.data.balance);
                    setTransactions(walletResponse.data.transactions);
                } else {
                    console.error('Borrower does not exist');
                }
            } catch (error) {
                console.error('Error fetching wallet details:', error);
            }
        };

        fetchWalletDetails();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold">Borrower Wallet</h2>
            <p>Current Balance: ₹{balance}</p>
            <h3 className="text-xl font-semibold">Transaction History</h3>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.type === 'credit' ? 'Credited' : 'Debited'}: ₹{transaction.amount} on {new Date(transaction.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowerWallet; 