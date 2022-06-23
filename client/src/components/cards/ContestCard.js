import React from "react";
import moment from "moment";

function ContestCard(props) {
    return (
        <div className="card" style={{paddingBottom: 10, marginBottom: 10}}>
            <div className="card-body">
                <h3 className="card-title">{props.title}</h3>
                <h4 className="card-subtitle text-muted">{
                    (moment(props.start)).format("MMMM Do YYYY, h:mm:ss a") + " - " + 
                        (moment(props.end)).format("MMMM Do YYYY, h:mm:ss a")
                }</h4>
                <p className="card-text">{props.description || ""}</p>
            </div>
            {
                (moment().isBefore(moment(props.start)) || moment().isAfter(moment(props.end))) ? 
                    <></> : 
                    <a href={window.location.href + "/" + props.contestId} className="stretched-link"/>
            }
        </div>
    );
}

export default ContestCard;