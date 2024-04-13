import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShoppingCart, faSearch, faHome, faShirt } from '@fortawesome/free-solid-svg-icons';
import { useUser } from "@clerk/clerk-react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import './ScrollTop.css';
import DesktopNavbar from './DesktopNavbar';

const ScrollTop = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isLoaded) {
    return null; 
  }

  if (isMobile){
    return (
      <div>
        {/* Top Navbar for Search and Logo */}
        <nav className="top-navbar">
          <div className="top-navbar-container">
            <a href="#" className="logo">
              <img src="/path/to/your/logo.png" alt="Logo" height="30" className="logo-image" />
            </a>
            <div className="search">
              <input type="search" placeholder="Search" />
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} style={{ fontSize: '18px', color: '#333', cursor: 'pointer' }} />
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom Navbar for Navigation */}
        <nav className="bottom-navbar">
          <div className="bottom-navbar-container">          
              <div>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} style={{ fontSize: '24px', color: '#333', cursor: 'pointer' }} />
                </Link>
              </div>
              {/* <li><a href="/admin">POST</a></li> */}
              <div>
                <Link to="/tshirtDesigner">
                  <FontAwesomeIcon icon={faShirt} style={{ fontSize: '24px', color: '#333', cursor: 'pointer' }} />
                </Link>
              </div>
            
              {isSignedIn ? (
                <Link to={`/cart/${user.id}`}>
                  <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '24px', color: '#333', cursor: 'pointer' }} />
                </Link>
              ) : (
                <Link to="/">
                  <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '24px', color: '#333', cursor: 'pointer' }} />
                </Link>
              )}
              
              <div className="sign-in-out">
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <SignInButton className="sign-in" />
                )}
              </div>          
          </div>
        </nav>
      </div>
    );
  }
  else{
    return <DesktopNavbar/>
  }
};

export default ScrollTop;
