import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Contests from "./pages/Contests";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route exact path = "/contests" element = {<Contests/>} />
        <Route exact path = "/admin" element = {<Admin/>} />
      </Routes>
    </Router>
  );
}

export default App;
