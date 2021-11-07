import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Contests from "./components/Contests";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/contests" element = {<Contests/>} />
      </Routes>
    </Router>
  );
}

export default App;
