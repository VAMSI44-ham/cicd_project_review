import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customercss/Notifications.css';

const API_URL = `${import.meta.env.VITE_API_URL}/notification`;

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const storedCustomer = JSON.parse(sessionStorage.getItem('customer'));
    if (!storedCustomer) {
      setLoading(false);
      return;
    }
    setCustomer(storedCustomer);
    fetchNotifications(storedCustomer.id);
    fetchUnreadCount(storedCustomer.id);
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications(storedCustomer.id);
      fetchUnreadCount(storedCustomer.id);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async (customerId) => {
    try {
      const res = await axios.get(`${API_URL}/customer/${customerId}`);
      setNotifications(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setLoading(false);
    }
  };

  const fetchUnreadCount = async (customerId) => {
    try {
      const res = await axios.get(`${API_URL}/customer/${customerId}/unread/count`);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`${API_URL}/read/${notificationId}`);
      setNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const markAllAsRead = async () => {
    if (!customer) return;
    try {
      await axios.put(`${API_URL}/customer/${customer.id}/read-all`);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      transaction: '💳',
      loan: '💰',
      account: '🏦',
      security: '🔒'
    };
    return icons[type] || '📌';
  };

  if (!customer) {
    return <div className="notifications-container">Please log in to view notifications</div>;
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>📬 Notifications</h2>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="mark-all-read-btn">
            Mark all as read
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="no-notifications">
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <div className="notification-icon">{getTypeIcon(notification.type)}</div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
              {!notification.isRead && <div className="unread-dot"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

