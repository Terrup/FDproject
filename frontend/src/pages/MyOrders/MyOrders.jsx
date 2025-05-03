import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      // Decode userId from token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      const response = await axios.post(
        `${url}/api/orders/userorders`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setData(response.data.data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2 className='myordersp'>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={order._id || index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, idx) =>
                `${item.name} x ${item.quantity}${idx !== order.items.length - 1 ? ', ' : ''}`
              )}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
        {data.length === 0 && <p>No orders found.</p>}
      </div>
    </div>
  );
};

export default MyOrders;
