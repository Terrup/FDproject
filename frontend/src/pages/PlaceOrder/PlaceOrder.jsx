import React, { useEffect, useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    
    if (name === 'phone') {
      // Format phone number as (xxx)xxx-xxxx
      const cleaned = value.replace(/\D/g, '').substring(0, 10);
      let formatted = cleaned;
      if (cleaned.length > 6) {
        formatted = `(${cleaned.slice(0, 3)})${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      } else if (cleaned.length > 3) {
        formatted = `(${cleaned.slice(0, 3)})${cleaned.slice(3)}`;
      }
      setData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("🟡 Checkout button clicked");

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] && cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      console.log("🔵 Sending order to backend:", orderData);
      const response = await axios.post(url + "/api/orders/place", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🟢 Backend response:", response.data);

      if (response.data.success && response.data.session_url) {
        window.location.replace(response.data.session_url);
      } else {
        alert("❌ Order failed: No session_url returned.");
      }
    } catch (err) {
      console.error("❌ Order placement error:", err);
      alert("Order failed. See console for details.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone (e.g., (123)456-7890)' />
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
