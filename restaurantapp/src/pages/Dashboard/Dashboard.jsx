import { useState, useEffect } from "react";
import { api } from "../../services/api";
import "./Dashboard.css";

const Dashboard = () => { 
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser 
      ? JSON.parse(savedUser)
      : {
          username: "John Doe",
          email: "john@example.com",
          contact: "+1234567890",
          address: "12/A ABC Street",
        };
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editedItems, setEditedItems] = useState([]);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await api.deleteOrder(orderId);
      setOrders(prev => prev.filter(order => order.id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete order.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = await api.updateOrderStatus(orderId, newStatus);
      setOrders(prev =>
        prev.map(order => order.id === orderId ? updatedOrder : order)
      );
      alert("Order status updated!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update order status.");
    }
  };


  const handleUpdateItems = async (orderId) => {
  try {
    const updatedOrder = await api.updateOrderItems(orderId, editedItems);
    setOrders(prev =>
      prev.map(order => order.id === orderId ? updatedOrder : order)
    );
    setEditOrderId(null);
    alert("Order items updated!");
  } catch (error) {
    console.error("Update items failed:", error);
    alert("Failed to update items.");
  }
};




  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userOrders = await api.getOrders();
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-page">
      <div className="container-dash">
        <div className="dashboard-header">
          <h1>DINEX</h1>
          <h2>DASHBOARD</h2>
        </div>

        <div className="welcome-section">
          <h3>Hello, {user.username}!</h3>
          <p>Welcome back, {user.username}!</p>
          <p>Here's your order summary at DINEX</p>
        </div>

        <div className="reservation-section">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="reservation-card">
                <h3>DINEX Restaurant</h3>
                <div className="reservation-details">
                  <div className="detail">
                    <span>Date:</span>
                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail">
                    <span>Time:</span>
                    <span>{new Date(order.orderDate).toLocaleTimeString()}</span>
                  </div>
                  <div className="detail">
                    <span>Status:</span>
                    <span>{order.status}</span>
                  </div>
                  <div className="detail">
                    <span>Total:</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="detail">
                    <span>Items:</span>
                    {editOrderId === order.id ? (
                      <div className="edit-items">
                        {editedItems.map((item, index) => (
                          <div key={index} className="edit-item-row">
                            <span>{item.foodItem?.name}</span>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const newItems = [...editedItems];
                                newItems[index].quantity = parseInt(e.target.value);
                                setEditedItems(newItems);
                              }}
                            />
                          </div>
                        ))}
                        <button className="btn" onClick={() => handleUpdateItems(order.id)}>Save</button>
                        <button className="btn cancel-btn" onClick={() => setEditOrderId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <ul>
                        {order.orderItems?.map((item, index) => (
                          <li key={index}>
                            {item.foodItem?.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {editOrderId !== order.id && (
                    <button className="btn edit-btn" onClick={() => {
                      setEditOrderId(order.id);
                      setEditedItems(order.orderItems.map(item => ({
                        foodItem: { id: item.foodItem.id,
                        name: item.foodItem.name
                         },
                        quantity: item.quantity,
                        price: item.price
                      })));
                    }}>
                      Edit Items
                    </button>
                  )}

                  

                  <div className="order-actions">
                    <button className="delete-btn" onClick={() => handleDelete(order.id)}>
                      Delete Order
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="no-reservation">No orders yet.</p>
          )}
        </div>

        <div className="profile-section">
          <h3>Profile Settings</h3>
          <form className="profile-form" onSubmit={handleSave}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                value={user.contact}
                onChange={(e) => setUser({ ...user, contact: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>
            <button type="submit" className="btn">
              Save Changes
            </button>
          </form>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;