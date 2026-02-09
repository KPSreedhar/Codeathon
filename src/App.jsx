import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage1 from "./pages/LandingPage1";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/round1" element={<LandingPage1 />} />
      <Route path="/round1/game" element={<GamePage />} />
    </Routes>
  );
}

export default App;
