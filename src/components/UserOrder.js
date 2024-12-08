import { useEffect, useState } from "react";
import '../styles/UserOrder.css'; 

function UserOrder() {
  const [orders, setOrders] = useState([]); 
  const userId = localStorage.getItem("userId"); 

  
  useEffect(() => {
    if (userId) {
      fetch(`https://canteenbackend-wwbl.onrender.com/orders/getorders/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          
          if (data && Array.isArray(data.orders)) {
            setOrders(data.orders);
          } else {
            setOrders([]); 
          }
        })
        .catch((err) => console.error("Error:", err));
    } else {
      console.error("User ID not found in localStorage");
    }
  }, [userId]);

  return (
    <div className="order-container">
      <h1 className="order-title">Your Orders</h1>
      {orders && orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3 className="order-id">Order #{order._id}</h3>
              <p className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </p>
            </div>
            <div className="order-details">
              <p className="order-total-price">Total Price: Rs. {order.totalPrice}</p>
              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={item.itemId} className="order-item">
                    <span className="item-name">{item.name}</span> - 
                    <span className="item-price">Rs. {item.price}</span> x 
                    <span className="item-quantity">{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrder;
