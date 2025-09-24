import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    try {
      logout();
      setIsMenuOpen(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserName = () => {
    if (!user) return 'User';
    return user.username || user.name || 'User';
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
            DINEX
          </Link>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/menu" className="nav-link" onClick={() => setIsMenuOpen(false)}>Menu</Link>
            <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            
            {user ? (
              <>
                <span className="nav-link user-welcome">
                  Welcome, {getUserName()}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="nav-link logout-btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="nav-link btn" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
          
          <button 
            className="hamburger" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;