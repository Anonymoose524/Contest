import React, {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import NotFound from "../NotFound";

function RequireAdmin(props){

    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await fetch(process.env.REACT_APP_SERVER + "/accounts/token/" + props.token.token)
            .then(res => res.json())
            .then(data => setIsAdmin((data && data.admin) ? true : false));
        }
        fetchData();
    }, []);

    if(isAdmin === null) return null;
    else if(isAdmin) return <Outlet/>;
    else return <NotFound/>;

}

export default RequireAdmin;