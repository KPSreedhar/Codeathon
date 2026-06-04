import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LandingPage1 from "./pages/LandingPage1";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/round1" element={<LandingPage1 />} />
        <Route path="/round1/game" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
