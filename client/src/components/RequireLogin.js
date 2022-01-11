import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
require('dotenv').config();

function RequireLogin(props){
    
    useEffect(() => {
        if(props.token === null) {
            props.setLoggedIn(false);
            return;
        }
        fetch(process.env.REACT_APP_SERVER + "/accounts/token", {
            method: "POST",
            body: props.token
        }).then(res => res.json())
        .then(data => props.setLoggedIn(data));
    }, []);

    if(props.loggedIn === null){
        return null;
    } else if(props.loggedIn) {
        return <Outlet />;
    } else {
        return <Login setToken={props.setToken} setLoggedIn={props.setLoggedIn}/>;
    }
}

export default RequireLogin;