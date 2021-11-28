import React from "react";

function AnnounceCard(props) {
    return (
        <div class="card" style={{paddingBottom: 10, marginBottom: 10}}>
            <div class="card-body">
                <h3 class="card-title">{props.title}</h3>
                <p class="card-text">{props.description}</p>
            </div>
        </div>
    );
}

export default AnnounceCard;