import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WorkoutEdit from "./components/WorkoutEdit";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          
          <Route path="/" element={ user ? <Home /> : <Navigate to="/login"/> } />
          <Route path="/login" element={ !user ? <Login /> : <Navigate to="/"/>} />
          <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/"/>} />
          <Route path="/edit" element={ user ? <WorkoutEdit /> : <Navigate to="/login"/>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
