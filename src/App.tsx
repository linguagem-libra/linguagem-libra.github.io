import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="wrapper">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"></link>
      <Navbar />
      <Banner />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
