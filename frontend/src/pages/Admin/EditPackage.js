import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPackage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const { id } = useParams();  // Get the package ID from the URL params
  const navigate = useNavigate();  // To navigate back to admin panel after update

  // Fetch the current package details
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`https://travel-agency-booking-system-rps0.onrender.com/packages/${id}`);
        const packageData = res.data;
        setTitle(packageData.title);
        setDescription(packageData.description);
        setPrice(packageData.price);
        setImage(packageData.image);
      } catch (err) {
        console.error('Error fetching package:', err);
        alert('Failed to fetch package details');
      }
    };

    fetchPackage();
  }, [id]);

  // Handle the form submission for updating the package
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPackage = { title, description, price, image };

    try {
      await axios.put(`https://travel-agency-booking-system-rps0.onrender.com/admin/packages/${id}`, updatedPackage);
      alert('Package updated successfully');
      navigate('/admin');  // Redirect to the admin dashboard after successful update
    } catch (err) {
      console.error('Error updating package:', err);
      alert('Failed to update package');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Package</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            className="form-control" 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input 
            type="number" 
            className="form-control" 
            id="price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input 
            type="text" 
            className="form-control" 
            id="image" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Package</button>
      </form>
    </div>
  );
};

export default EditPackage;
