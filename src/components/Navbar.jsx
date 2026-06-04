import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("studentData") || "null");

  const handleLogout = () => {
    localStorage.removeItem("studentData");
    localStorage.removeItem("round1StartTime");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand" onClick={() => navigate("/")}>
        Codeathon <em>2026</em>
      </span>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">👤 {user.name}</span>
            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="navbar-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
