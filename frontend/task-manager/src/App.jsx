import "./App.css";
import HomeSection from "./pages/HomeSection.jsx";
import RegisterSection from "./pages/RegisterSection.jsx";
import LoginSection from "./pages/LoginSection.jsx";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeDashboard from "./pages/HomeDashboard.jsx";
import AddTask from "./components/AddTask";
import ProfileScreen from "./pages/ProfileScreen.jsx";
import EditProfile from "./components/EditProfile";
import TaskCalendar from "./pages/TaskCalendar.jsx"
import Progress from "./pages/Progress.jsx"

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
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/taskCalendar" element={<TaskCalendar />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </>
  );
}

export default App;