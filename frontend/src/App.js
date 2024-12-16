import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PackageDetails from './pages/PackageDetails';
import BookingForm from './pages/BookingForm';
import AdminPanel from './pages/AdminPanel';
import AddPackage from './pages/Admin/AddPackage';
import EditPackage from './pages/Admin/EditPackage';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/add-package" element={<AddPackage />} />
        <Route path="/admin/edit-package/:id" element={<EditPackage />} />
      </Routes>
    </Router>
  );
};

export default App;
