import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './styles.css';

const Home = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Available Tour Packages</h1>
      <div className="row">
        {packages.map((pkg) => (
          <div key={pkg._id} className="col-md-4 mb-4">
            <div className="card package-card">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="card-img-top package-image"
              />
              <div className="card-body">
                <h5 className="package-title">{pkg.title}</h5>
                <p className="package-description">{pkg.description}</p>
                <p className="text-primary fw-bold">Price: ${pkg.price}</p>
                <Link to={`/book/${pkg._id}`} className="btn book-now-btn">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
