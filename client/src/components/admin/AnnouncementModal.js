import React from "react";

function AnnouncementModal(props) {
    
    async function deleteAnnouncement(event){
        //event.preventDefault();
        console.log(event.target.getAttribute("index"));
        let index = parseInt(event.target.getAttribute("index"));
        await fetch(process.env.REACT_APP_SERVER + "/announcements/" + props.Announcements[index]._id, {
            method: "DELETE"
        });
    }

    return(
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#announcementModal">
            Announcements
            </button>

            <div className="modal fade" id="announcementModal" tabIndex="-1" aria-labelledby="announcementModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="announcementModalLabel">Announcements</h5>
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