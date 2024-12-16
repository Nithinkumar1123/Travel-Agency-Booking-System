import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  // Fetch packages and bookings
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('https://travel-agency-booking-system-rps0.onrender.com/packages');
        setPackages(res.data);
      } catch (err) {
        console.error('Error fetching packages:', err);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axios.get('https://travel-agency-booking-system-rps0.onrender.com/api/bookings');
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchPackages();
    fetchBookings();
  }, []);

  // Handle package deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://travel-agency-booking-system-rps0.onrender.com/admin/packages/${id}`);
      setPackages(packages.filter(pkg => pkg._id !== id));
    } catch (err) {
      console.error('Error deleting package:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>
      
      <div className="mb-4">
        <Link to="/admin/add-package" className="btn btn-primary">Add New Package</Link>
      </div>
      
      <div className="mb-5">
        <h3>Tour Packages</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg._id}>
                <td>{pkg.title}</td>
                <td>${pkg.price}</td>
                <td>
                  <Link to={`/admin/edit-package/${pkg._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pkg._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div>
        <h3>Submitted Bookings</h3>
        <table className="table table-striped">
          <thead>
            <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Package</th>
            <th>Travelers</th>
            <th>Total Price</th>
            <th>Special Request</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                 <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{booking.packageTitle}</td>
              <td>{booking.travelers}</td>
              <td>${booking.totalPrice}</td>
              <td>{booking.specialRequest || 'None'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
