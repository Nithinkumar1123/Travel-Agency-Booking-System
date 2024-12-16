import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const { id } = useParams(); // Package ID from the URL
  const [packageDetails, setPackageDetails] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequest: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  // Fetch package details by ID
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`https://travel-agency-booking-system-rps0.onrender.com/packages/${id}`);
        setPackageDetails(response.data);
      } catch (err) {
        console.error('Error fetching package details:', err);
      }
    };

    fetchPackageDetails();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...formData,
      packageId: id, // Send the package ID with the booking
    };

    try {
      const response = await axios.post('https://travel-agency-booking-system-rps0.onrender.com/api/bookings', bookingData);
      if (response.status === 201) {
        setSuccessMessage('Booking submitted successfully!');
        setErrorMessage('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          travelers: 1,
          specialRequest: '',
        });

        // Hide success message after 3 seconds and redirect to home page
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting booking:', error.response || error.message);
      setErrorMessage('Failed to submit booking. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Book Your Tour Package</h2>
      {packageDetails.title && (
        <div className="mb-4">
          <h4>{packageDetails.title}</h4>
          <p>{packageDetails.description}</p>
          <p><strong>Price:</strong> ${packageDetails.price}</p>
        </div>
      )}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="travelers" className="form-label">Number of Travelers</label>
          <input
            type="number"
            id="travelers"
            name="travelers"
            value={formData.travelers}
            onChange={handleChange}
            className="form-control"
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="specialRequest" className="form-label">Special Requests</label>
          <textarea
            id="specialRequest"
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
