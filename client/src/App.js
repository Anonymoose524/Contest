import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import RequireLogin from './components/RequireLogin';
import Home from "./pages/Home";
import Contests from "./pages/Contests";
import Admin from "./pages/Admin";

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

  // //Be careful with truthy promise
  // function tokenExists(){
  //   if(!token) return false;
  //   return fetch(process.env.REACT_APP_SERVER + "/accounts/token", {
  //     method: "POST",
  //     body: token
  //     })
  //     .then(res => res.json())
  //     .then(data => {isPending = false; return data.body});
  // }

  // if(!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {
          <RequireLogin token={token} setToken={setToken} 
          loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        }>
          <Route path = "/" element = {<Navigation setToken={setToken} setLoggedIn={setLoggedIn}/>}>
            <Route exact path = "/" element = {<Home/>} />
            <Route exact path = "/contests" element = {<Contests/>} />
            <Route exact path = "/admin" element = {<Admin/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
