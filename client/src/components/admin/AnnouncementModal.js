import React from "react";

function AnnouncementModal(props) {
    
    async function deleteAnnouncement(event){
        event.preventDefault();
        let index = parseInt(event.target.getAttribute("index"));
        await fetch(process.env.REACT_APP_SERVER + "/announcements/" + props.Announcements[index]._id, {
            method: "DELETE"
        });
    }

    async function postAnnouncement(event){
        event.preventDefault();
        await fetch(process.env.REACT_APP_SERVER + "/announcements", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: event.target.title.value,
                description: event.target.description.value
            })
        });
        document.getElementById("postAnnouncement").reset();
    }

    return(
        <div style={{display: "inline-block", marginRight: "10px"}}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#announcementModal">
            Announcements
            </button>
            <form id="postAnnouncement" onSubmit={(event) => postAnnouncement(event)}></form>
            <div className="modal fade" id="announcementModal" tabIndex="-1" aria-labelledby="announcementModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="announcementModalLabel">Announcements</h3>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped" id="announcementTable">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Deletion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.Announcements.map((announcement, index) => {
                                            return (
                                                <tr key={index+1}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{announcement.title}</td>
                                                    <td style={{"wordWrap": "break-word","minWidth": "160px", "maxWidth": "160px"}}>{announcement.description}</td>
                                                    <td>
                                                        <button type="button" className="btn-close" aria-label="Close" index={index} onClick={(event) => deleteAnnouncement(event)}/>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td></td>
                                        <td><input className="form-control" type={"text"} form="postAnnouncement" name="title" placeholder="Title"></input></td>
                                        <td><input className="form-control" type={"text"} form="postAnnouncement" name="description" placeholder="Description"></input></td>
                                        <td><button type="submit" className="btn btn-success" form="postAnnouncement">Create</button></td>
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

export default AnnouncementModal;