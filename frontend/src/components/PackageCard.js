import React from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg }) => {
  return (
    <div className="card mb-4">
      <img src={pkg.image} className="card-img-top" alt={pkg.title} />
      <div className="card-body">
        <h5 className="card-title">{pkg.title}</h5>
        <p className="card-text">{pkg.description}</p>
        <p className="card-text"><strong>Price:</strong> ${pkg.price}</p>
        <Link to={`/package/${pkg._id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default PackageCard;
