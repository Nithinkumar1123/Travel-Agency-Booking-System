import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Main() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Navigate to /home
  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-4">Welcome to Wanderlust Travels</h1>
        <p className="lead mt-3">
          Explore the world with us! Find exclusive deals and book your dream tour package today.
        </p>
        <button className="btn btn-light btn-lg mt-4" onClick={goToHome}>
          Explore Packages
        </button>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-globe2 display-4 text-primary"></i>
                <h5 className="card-title mt-3">Worldwide Destinations</h5>
                <p className="card-text">
                  Discover breathtaking destinations across the globe, handpicked just for you.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-emoji-smile display-4 text-success"></i>
                <h5 className="card-title mt-3">Unmatched Experiences</h5>
                <p className="card-text">
                  Create memories with unique and curated travel experiences tailored to your needs.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-geo-alt display-4 text-danger"></i>
                <h5 className="card-title mt-3">Local Expertise</h5>
                <p className="card-text">
                  Trust our local guides and experts to make your trip truly unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-dark text-white text-center py-5">
        <h2 className="mb-4">Ready to Book Your Next Adventure?</h2>
        <p className="mb-4">
          Don’t miss out on our exclusive travel packages. Book now and experience the journey of a lifetime!
        </p>
        <button className="btn btn-primary btn-lg" onClick={goToHome}>
          Browse Packages
        </button>
      </div>
    </div>
  );
}

export default Main;
