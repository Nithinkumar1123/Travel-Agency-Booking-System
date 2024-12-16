import React from 'react';

const Invoice = ({ booking, pkg }) => {
  return (
    <div className="container mt-5">
      <h3>Invoice</h3>
      <p><strong>Customer Name:</strong> {booking.name}</p>
      <p><strong>Package:</strong> {pkg.title}</p>
      <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
    </div>
  );
};

export default Invoice;
