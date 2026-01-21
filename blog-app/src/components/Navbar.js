import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotification();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addNotification('로그아웃 되었습니다.', 'info');
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Blog App
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          
          {user ? (
            <>
              <Link to="/create" className="navbar-item">
                Create Post
              </Link>
              <span className="navbar-item">
                {user.username}
              </span>
              <button onClick={handleLogout} className="navbar-item btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-item">
                Login
              </Link>
              <Link to="/register" className="navbar-item">
                Register
              </Link>
            </>
          )}
          <button onClick={toggleTheme} className="navbar-item btn">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;