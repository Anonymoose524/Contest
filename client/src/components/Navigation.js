import React from "react";
import { Outlet } from "react-router-dom";
//import Login from "./Login";
//import {  Link } from "react-router-dom";
//import "./Navigation.css";

function Navigation(props){

    function handleLogout(event){
        event.preventDefault();
        props.setToken(null);
        props.setLoggedIn(false);
        window.localStorage.clear();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Programming Contest</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contests">Contests</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin">Admin Portal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={handleLogout}>Logout</a> {/*TODO*/}
                                
                            </li>
                        </ul>
                    </div>
                </div>
                
            </nav>
            <Outlet />
        </>
    );
}

export default Navigation;