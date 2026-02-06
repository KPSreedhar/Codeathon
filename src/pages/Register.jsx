import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    classYear: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.classYear || !formData.mobile) {
      alert("Please fill all details");
      return;
    }

    // Store in localStorage
    localStorage.setItem("studentData", JSON.stringify(formData));

    alert("Registration Successful");

    // Optional redirect (future dashboard)
    // navigate("/dashboard");
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Student Login</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="classYear"
          placeholder="Class / Year"
          value={formData.classYear}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
        />

        <button type="submit" className="register-btn">
          Register & Login
        </button>

        <p className="back-link" onClick={() => navigate("/")}>
          Back to Home
        </p>
      </form>
    </div>
  );
};

export default Register;
