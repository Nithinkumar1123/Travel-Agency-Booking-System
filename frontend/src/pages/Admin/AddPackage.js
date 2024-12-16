import React, { useState } from 'react';
import axios from 'axios';

const AddPackage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPackage = { title, description, price, image };

    try {
      const response = await axios.post('https://travel-agency-booking-system-rps0.onrender.com/admin/packages', newPackage);
      console.log('Package added:', response.data);
      alert('Package added successfully');
    } catch (err) {
      console.error('Error adding package:', err);
      alert('Failed to add package');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Package</h2>
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
        <button type="submit" className="btn btn-primary">Add Package</button>
      </form>
    </div>
  );
};

export default AddPackage;
