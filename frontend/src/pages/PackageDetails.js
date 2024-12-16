import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      const response = await axios.get(`/api/packages/${id}`);
      setPkg(response.data);
    };
    fetchPackage();
  }, [id]);

  const handleBooking = () => {
    navigate(`/book/${id}`);
  };

  return (
    pkg && (
      <div className="container mt-5">
        <h1>{pkg.title}</h1>
        <img src={pkg.image} alt={pkg.title} className="img-fluid" />
        <p>{pkg.description}</p>
        <p><strong>Price:</strong> ${pkg.price}</p>
        <p><strong>Available Dates:</strong> {pkg.availableDates.join(', ')}</p>
        <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>
      </div>
    )
  );
};

export default PackageDetails;
