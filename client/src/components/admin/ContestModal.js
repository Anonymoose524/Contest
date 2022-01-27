import React from "react";
import Moment from "moment";

function ContestModal(props) {
    
    async function deleteContest(event){
        event.preventDefault();
        let contestindex = parseInt(event.target.getAttribute("contestindex"));
        await fetch(process.env.REACT_APP_SERVER + "/contests/" + props.Contests[contestindex]._id, {
            method: "DELETE"
        });
    }

    async function postContest(event){
        event.preventDefault();
        await fetch(process.env.REACT_APP_SERVER + "/contests", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contestId: event.target.contestId.value,
                title: event.target.title.value,
                start: (new Moment(event.target.start.value, "DD/MM/YYYY hh:mm:ss")).toDate(),
                end: (new Moment(event.target.end.value, "DD/MM/YYYY hh:mm:ss")).toDate(),
                description: event.target.description.value
            })
        });
        document.getElementById("postContest").reset();
    }

    async function deleteProblem(event){
        event.preventDefault();
        console.log(event);
        let contestindex = parseInt(event.target.getAttribute("contestindex"));
        let problemindex = parseInt(event.target.getAttribute("problemindex"));
        await fetch(process.env.REACT_APP_SERVER + "/contests/problem/" + props.Contests[contestindex]._id + "/" + props.Contests[contestindex].problems[problemindex]._id, {
            method: "DELETE"
        });
    }

    async function postProblem(event){
        event.preventDefault();
        let contestindex = parseInt(event.target.getAttribute("contestindex"));
        await fetch(process.env.REACT_APP_SERVER + "/contests/problem", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contestId: props.Contests[contestindex].contestId,
                problem: {
                    title: event.target.title.value,
                    statement: event.target.statement.value
                }
            })
        });
        document.getElementById(event.target.getAttribute("id")).reset();
    }

    return(
        <div style={{display: "inline-block", marginRight: "10px"}}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#contestModal">
            Contests
            </button>
            <form id="postContest" onSubmit={(event) => postContest(event)}></form>
            <div className="modal fade" id="contestModal" tabIndex="-1" aria-labelledby="contestModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="contestModalLabel">Contests</h3>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped" id="contestTable">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Contest ID</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">End Time</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Problems</th>
                                        <th scope="col">Deletion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.Contests.map((contest, contestindex) => {
                                            return (
                                                <React.Fragment key={contestindex+1}>
                                                    <tr>
                                                        <th scope="row" rowSpan="2">{contestindex+1}</th>
                                                        <td>{contest.contestId}</td>
                                                        <td>{contest.title}</td>
                                                        <td>{new Moment(contest.start).format("DD/MM/YYYY hh:mm:ss")}</td>
                                                        <td>{new Moment(contest.end).format("DD/MM/YYYY hh:mm:ss")}</td>
                                                        <td style={{"wordWrap": "break-word","minWidth": "160px", "maxWidth": "160px"}}>{contest.description}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target={"#" + contest.contestId}>View Problems</button>
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn-close" aria-label="Close" contestindex={contestindex} onClick={(event) => deleteContest(event)}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="6">
                                                            <div className="collapse" id={contest.contestId}>
                                                                <table className="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">#</th>
                                                                            <th scope="col">Title</th>
                                                                            <th scope="col">Statement</th>
                                                                            <th scope="col">Deletion</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            contest.problems.map((problem, problemindex) => {
                                                                                return (
                                                                                    <tr key={problemindex+1}>
                                                                                        <th scope="row">{problemindex+1}</th>
                                                                                        <td>{problem.title}</td>
                                                                                        <td style={{"wordWrap": "break-word","minWidth": "160px", "maxWidth": "160px"}}>{problem.statement}</td>
                                                                                        <td><button type="button" className="btn-close" aria-label="Close" contestindex={contestindex} problemindex={problemindex} onClick={(event) => deleteProblem(event)}/></td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                        <tr>
                                                                            <td><form id={"postProblem:" + contest.contestId} contestindex={contestindex} onSubmit={(event) => postProblem(event)}></form></td>
                                                                            <td><input className="form-control" type={"text"} form={"postProblem:" + contest.contestId} name="title" placeholder="Title"></input></td>
                                                                            <td><input className="form-control" type={"text"} form={"postProblem:" + contest.contestId} name="statement" placeholder="Statement"></input></td>
                                                                            <td><button type="submit" className="btn btn-success" form={"postProblem:" + contest.contestId}>Create</button></td>
                                                                        </tr>
                                                                    </tbody>
                                                                    
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td></td>
                                        <td><input className="form-control" type={"text"} form="postContest" name="contestId" placeholder="Contest ID"></input></td>
                                        <td><input className="form-control" type={"text"} form="postContest" name="title" placeholder="Title"></input></td>
                                        <td><input className="form-control" type={"text"} form="postContest" name="start" placeholder="Start Time"></input></td>
                                        <td><input className="form-control" type={"text"} form="postContest" name="end" placeholder="End Time"></input></td>
                                        <td><input className="form-control" type={"text"} form="postContest" name="description" placeholder="Description"></input></td>
                                        <td></td>
                                        <td><button type="submit" className="btn btn-success" form="postContest">Create</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ContestModal;