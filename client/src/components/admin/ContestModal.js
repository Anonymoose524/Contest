import React from "react";
import Moment from "moment";

function ContestModal(props) {
    
    async function deleteContest(event){
        event.preventDefault();
        
    }

    async function postContest(event){
        event.preventDefault();
        
    }

    async function deleteProblem(event){
        event.preventDefault();
    }

    async function postProblem(event){
        event.preventDefault();
    }

    return(
        <div>
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
                                        <th scope="col"># | Title</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Problems</th>
                                        <th scope="col">Deletion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.Contests.map((contest, index) => {
                                            return (
                                                <React.Fragment key={index+1}>
                                                    
                                                    <tr>
                                                        <th scope="row" rowSpan="2">{(index+1) + " | " + contest.title}</th>
                                                        <td>{new Moment(contest.start).format("DD/MM/YYYY hh:mm:ss") + " - " + new Moment(contest.end).format("DD/MM/YYYY hh:mm:ss")}</td>
                                                        <td style={{"wordWrap": "break-word","minWidth": "160px", "maxWidth": "160px"}}>{contest.description}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target={"#" + contest.contestId}>View Problems</button>
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn-close" aria-label="Close" index={index} onClick={(event) => deleteContest(event)}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan="3">
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
                                                                            contest.problems.map((problem, index) => {
                                                                                return (
                                                                                    <tr key={index+1}>
                                                                                        <th scope="row">{index+1}</th>
                                                                                        <td>{problem.title}</td>
                                                                                        <td style={{"wordWrap": "break-word","minWidth": "160px", "maxWidth": "160px"}}>{problem.statement}</td>
                                                                                        <td><button type="button" className="btn-close" aria-label="Close" index={index} onClick={(event) => deleteProblem(event)}/></td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                        <tr>
                                                                            <td><form id={"postProblem:" + contest.contestId} onSubmit={(event) => postProblem(event)}></form></td>
                                                                            <td><input className="form-control" type={"text"} form={"postProblem:" + contest.contestId} name="title"></input></td>
                                                                            <td><input className="form-control" type={"text"} form={"postProblem:" + contest.contestId} name="statement"></input></td>
                                                                            <td><button type="submit" className="btn btn-success" form={"postProblem:" + contest.contestId}>Create</button></td>
                                                                        </tr>
                                                                    </tbody>
                                                                    
                                                                </table>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td><input className="form-control" type={"text"} form="postContest" name="title"></input></td>
                                        <td><input className="form-control" type={"text"} form="postContest" name="date"></input></td>
                                        <td><input className="form-control" type={"text"} form="postContest" name="description"></input></td>
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