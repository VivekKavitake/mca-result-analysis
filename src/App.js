import React from 'react';
import './App.css';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

import Header from './components/Header';
import StudentList from './components/StudentList';
import ResultChart from './components/ResultChart';

const App = () => {
  return (

    <div className="app-container">
      <Header />
      <div className="content-container">
        <div className="student-list">
          <StudentList />
        </div>
        <div className="result-chart">
          <ResultChart />
        </div>
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h4>About Us</h4>
            <p>Learn more about our company and values.</p>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <p>Email: info@yourcompany.com</p>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <a href='https://facebook.com' aria-label='Facebook'><FaFacebook /></a>
            <br />
            <a href='https://twitter.com' aria-label='Twitter'><FaTwitter /></a>
          </div>
        </div>
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
