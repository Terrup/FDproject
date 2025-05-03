import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './Verify.css';

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  const orderId = queryParams.get('orderId');

  const { url } = React.useContext(StoreContext);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) return;
      try {
        const res = await axios.post(`${url}/api/orders/verify`, {
          success,
          orderId
        });

        console.log("✅ Order verification result:", res.data);

        // Wait a second then redirect
        setTimeout(() => {
          navigate("/myorders");
        }, 2000);
      } catch (err) {
        console.error("❌ Failed to verify payment:", err);
        alert("Verification failed.");
        navigate("/");
      }
    };

    verifyPayment();
  }, [orderId, success, url, navigate]);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Verifying your payment... You’ll be redirected shortly.
      </p>
    </div>
  );
};

export default Verify;
