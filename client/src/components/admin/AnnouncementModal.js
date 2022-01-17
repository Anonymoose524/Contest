import React from "react";

function AnnouncementModal(props) {

    return(
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)"
            }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">
                            Announcements
                        </h3>
                    </div>
                    <div className="modal-body">
                        <p>Modal body</p>
                        <table className="table table-striped">
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
                                            <tr>
                                                <th scope="row">{index+1}</th>
                                                <td>{announcement.title}</td>
                                                <td style={{"white-space": "normal"}}>{announcement.description}</td>
                                                <td>
                                                    <button type="button" class="btn-secondary" aria-label="Close"/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={props.handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AnnouncementModal;