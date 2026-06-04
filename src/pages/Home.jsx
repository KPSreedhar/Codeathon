import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-card">
        <p className="hero-eyebrow">Tech Contest 2026</p>
        <h1>
          Codeathon – <span>Fix the Code</span>
        </h1>
        <p className="tagline">Think. Code. Compete.</p>
        <div className="hero-actions">
          <button className="cta-btn" onClick={() => navigate("/register")}>
            Register &amp; Play
          </button>
          <button
            className="cta-btn cta-btn--outline"
            onClick={() => navigate("/round1")}
          >
            Already Registered? Play
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
