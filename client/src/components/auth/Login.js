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
    }).then(async (res) => ({status: res.status, json: await res.json()}))
    .then(data => {
      if(data.status === 201){
        props.setToken({
          token: data.json.newToken
        });
        props.setLoggedIn(true);
      } else {
        setWarn(true);
      }
    });
  }

  function WarningBanner(props){
    if(!warn) return null;
    return (
      <div>
        <p className="py-3 text-danger">Incorrect credentials</p>
      </div>
    );
  }
  
  return(
    <div className="container py-5" style={{"display": "flex", "justify-content": "center"}}>
      <div className="card" style={{"minWidth": "400px", "borderRadius": "10px", "borderWidth": "medium"}}>
        <div className="card-body text-center">
          <h1>Sign in</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input className="form-control" placeholder="Username" type="text" id="username" name="username" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input className="form-control" placeholder="Password" type="password" id="password" name="password" />
            </div>
            
            <div>
              <button className="btn btn-primary mt-3" type="submit">Submit</button>
            </div>
            <WarningBanner/>
          </form>
          
        </div>
      </div>
    </div>

  );
}

export default Login;