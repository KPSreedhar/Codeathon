import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-card">
        <h1>
          Codeathon – <span>Tech Contest 2026</span>
        </h1>
        <p className="tagline">Think. Code. Compete.</p>
        <button className="cta-btn" onClick={() => navigate("/register")}>
          Register Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
