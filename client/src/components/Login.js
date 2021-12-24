import React, { useState } from "react";
require('dotenv').config();

function Login(props) {
  
  const [warn, setWarn] = useState(false);

  async function handleSubmit(event){
    event.preventDefault();
    await fetch(process.env.REACT_APP_SERVER + "/accounts/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": event.target.username.value,
        "password": event.target.password.value
      })
    }).then((response) => {
      if(response.status === 201){
        props.setToken({
          token: Math.random().toString(36).substring(2,10)
        });
      } else {
        setWarn(true);
      }
    });
  }

  function WarningBanner(props){
    if(!warn) return null;
    return (
      <div>
        <h1>Incorrect credentials</h1>
      </div>
    );
  }
  
  return(
      <div className="container">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" name="username" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" name="password" />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
          <WarningBanner/>
      </div>
    )
}

export default Login;