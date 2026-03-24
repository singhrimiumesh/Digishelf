import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useLibrary } from "../context/librarycontext";

export default function Navbar({ onLogout }) {
  const { user } = useLibrary();
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/home" className="nav-brand">
        <span>📚</span> DigiShelf
      </Link>
      <div className="nav-links">
        <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>Home</Link>
        <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>My Profile</Link>
      </div>
      <div className="nav-right">
        <span className="nav-user">👤 {user?.name}</span>
        <button className="nav-logout" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}