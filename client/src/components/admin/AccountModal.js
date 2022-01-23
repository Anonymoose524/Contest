import React from "react";

function AccountModal(props) {
    
    async function deleteAccount(event){
        event.preventDefault();
        let index = parseInt(event.target.getAttribute("index"));
        await fetch(process.env.REACT_APP_SERVER + "/accounts/" + props.Accounts[index]._id, {
            method: "DELETE"
        });
    }

    async function postAccount(event){
        event.preventDefault();
        await fetch(process.env.REACT_APP_SERVER + "/accounts/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
                members: event.target.members.value.split(", "),
                admin: (event.target.admin.value.toLowerCase() === "true") ? true : false
            })
        });
        document.getElementById("postAccount").reset();
    }

    return(
        <div style={{display: "inline-block", marginRight: "10px"}}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#accountModal">
            Accounts
            </button>
            <form id="postAccount" onSubmit={(event) => postAccount(event)}></form>
            <div className="modal fade" id="accountModal" tabIndex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="accountModalLabel">Accounts</h3>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped" id="accountTable">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Members</th>
                                        <th scope="col">Admin</th>
                                        <th scope="col">Deletion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.Accounts.map((account, index) => {
                                            return (
                                                <tr key={index+1}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{account.username}</td>
                                                    <td>{account.members.join(", ")}</td>
                                                    <td>{account.admin.toString()}</td>
                                                    <td>
                                                        <button type="button" className="btn-close" aria-label="Close" index={index} onClick={(event) => deleteAccount(event)}/>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input className="form-control" type={"text"} form="postAccount" name="username" placeholder="Username"></input>
                                            <input className="form-control" type={"password"} form="postAccount" name="password" placeholder="Password"></input>
                                        </td>
                                        <td><input className="form-control" type={"text"} form="postAccount" name="members" placeholder="Members"></input></td>
                                        <td><input className="form-control" type={"text"} form="postAccount" name="admin" placeholder="Admin"></input></td>
                                        <td><button type="submit" className="btn btn-success" form="postAccount">Create</button></td>
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

export default AccountModal;