import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import RequireLogin from './components/auth/RequireLogin';
import RequireAdmin from './components/auth/RequireAdmin';
import Home from "./pages/Home";
import Contests from "./pages/Contests";
import Contest from "./pages/Contest";
import Admin from "./pages/Admin";
import NotFound from './components/NotFound';

function App() {

  const [token, setToken] = useLocalStorage("token", null);
  const [loggedIn, setLoggedIn] = useState(null);

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

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {
          <RequireLogin token={token} setToken={setToken} 
          loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        }>
          <Route path = "/" element = {<Navigation setToken={setToken} setLoggedIn={setLoggedIn}/>}>
            <Route path = "*" element = {<NotFound/>}/>
            <Route exact path = "/" element = {<Home/>} />
            <Route exact path = "/contests" element = {<Contests/>}/>
            <Route path = "/contests/:contestId" element = {<Contest/>}/>
            <Route path = "/" element = {<RequireAdmin token={token}/>}>
              <Route exact path = "/admin" element = {<Admin/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
