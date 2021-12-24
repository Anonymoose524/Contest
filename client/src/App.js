import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Contests from "./pages/Contests";
import Admin from "./pages/Admin";

function App() {

  const [token, setToken] = useLocalStorage("token", null);

  //https://usehooks.com/useLocalStorage/
  function useLocalStorage(key, initialValue){
    const [storedValue, setStoredValue] = useState(() => {
      try{
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch(err) {
        return null;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

  function NavBar(props) {
    return (
      <div>
        <Navigation setToken={props.setToken}/>
        <Outlet />
      </div>
    );
  }

  if(!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <Routes>
          <Route path = "/" element = {<NavBar setToken={setToken} />}>
            <Route exact path = "/" element = {<Home/>} />
            <Route exact path = "/contests" element = {<Contests/>} />
            <Route exact path = "/admin" element = {<Admin/>} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
