import "./App.css";
import HomeSection from "./components/HomeSection";
import RegisterSection from "./components/RegisterSection";
import LoginSection from "./components/LoginSection";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeDashboard from "./components/HomeDashboard";
import AddTask from "./components/AddTask";
import ProfileScreen from "./components/ProfileScreen";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/register" element={<RegisterSection />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/homedashboard" element={< HomeDashboard/>} />
        <Route path="/AddTask" element={< AddTask/>} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </>
  );
}

export default App;