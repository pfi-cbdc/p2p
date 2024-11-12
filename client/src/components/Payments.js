import { useEffect, useState } from "react";
import api from "../api/axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const email = localStorage.getItem('email');
        const res = await api.get(`/api/lender/payments/${email}`);
        if(res.status === 200) {
            setPayments(res.data);
            console.log(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h1>Payments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>Rs. {payment.amount}</td>
                <td>{payment.razorpay_payment_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Payments;