import React from "react";

function ProblemCard(props) {
    return (
        <div className="card" style={{paddingBottom: 10, marginBottom: 10}}>
            <div className="card-header">
                <h2>{props.title}</h2>
            </div>
            <div className="card-body">
                {/*Need Katex formatting*/}
                <p className="card-text">{props.statement}</p>
            </div>
        </div>
    );
}

export default ProblemCard;