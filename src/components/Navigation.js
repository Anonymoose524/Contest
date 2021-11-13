import React from "react";
import Login from "./Login";
//import {  Link } from "react-router-dom";
//import "./Navigation.css";

function Navigation(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Newport Programming Contest</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contests">Contests</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admin">FAQ</a>
                        </li>
                        <li className="nav-item">
                            <a data-target="#myModal" data-toggle="modal" className="nav-link" href="#myModal">Logout</a> {/*TODO*/}
                            
                        </li>
                    </ul>
                </div>
            </div>
            
        </nav>
        
    );
}

export default Navigation;