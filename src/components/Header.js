import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <img src='Institute.png' alt='Institute Logo' className='logo' />
        <div className='header-content'>
          <h1>SIOM</h1>
          <p className='tagline'>Empowering Students for a Bright Future</p>
        </div>
       </div>
    </header>
  );
};

export default Header;
