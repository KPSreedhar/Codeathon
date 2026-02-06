import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
