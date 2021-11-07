import React from "react";
import {  Link } from "react-router-dom";
import "./Navigation.css";

function Navigation(){
    return (
        <div className = "navigation">
            <ul>
                <li style = {{float: "left"}}>
                    <Link to="/">NPC</Link>
                </li>
                <li>
                    <Link to="/contests">Contests</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;