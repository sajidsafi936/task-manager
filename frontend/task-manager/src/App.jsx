import "./App.css";
import HomeSection from "./components/HomeSection";
import RegisterSection from "./components/RegisterSection";
import LoginSection from "./components/LoginSection";
import { Routes, Route } from "react-router-dom";
import HomeDashboard from "./components/HomeDashboard";
import AddTask from "./components/AddTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeSection />} />
      <Route path="/register" element={<RegisterSection />} />
      <Route path="/login" element={<LoginSection />} />
      <Route path="/homedashboard" element={< HomeDashboard/>} />
      <Route path="/AddTask" element={< AddTask/>} />
    </Routes>
  );
}

export default App;