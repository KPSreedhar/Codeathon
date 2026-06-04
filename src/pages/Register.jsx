import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = localStorage.getItem("studentData");
    if (existingUser) {
      navigate("/round1");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    classYear: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.classYear.trim()) newErrors.classYear = "Class / Year is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    localStorage.setItem("studentData", JSON.stringify(formData));
    navigate("/round1");
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <p className="register-eyebrow">Codeathon 2026</p>
        <h2>Student Registration</h2>

        <div className="register-field">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="register-field">
          <input
            type="text"
            name="classYear"
            placeholder="Class / Year (e.g. 2nd Year CSE)"
            value={formData.classYear}
            onChange={handleChange}
            className={errors.classYear ? "input-error" : ""}
          />
          {errors.classYear && <span className="error-msg">{errors.classYear}</span>}
        </div>

        <div className="register-field">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number (10 digits)"
            value={formData.mobile}
            onChange={handleChange}
            className={errors.mobile ? "input-error" : ""}
          />
          {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
        </div>

        <button type="submit" className="register-btn">
          Register &amp; Continue →
        </button>

        <p className="back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </p>
      </form>
    </div>
  );
};

export default Register;
