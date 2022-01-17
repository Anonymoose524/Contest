import React from "react";

function AnnounceCard(props) {
    return (
        <div className="card" style={{paddingBottom: 10, marginBottom: 10}}>
            <div className="card-body">
                <h3 className="card-title">{props.title}</h3>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    );
}

export default AnnounceCard;