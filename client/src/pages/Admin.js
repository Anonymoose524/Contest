import React from "react";
import AnnouncementModal from "../components/admin/AnnouncementModal";

class Admin extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            Announcements: [],
            Contests: [],
            Accounts: []
        }
    }

    async componentDidMount() {
        //Setup announcements
        await fetch(process.env.REACT_APP_SERVER + "/announcements/")
            .then((res) => res.json())
            .then((data) => this.setState({Announcements: data}))
            .catch((err) => console.log(err));
        //Begin long polling
        this.getAnnouncements();
    }

    //Long polling for announcements
    async getAnnouncements() {
        await fetch(process.env.REACT_APP_SERVER + "/announcements/long")
            .then((res) => res.json())
            .then((data) => {
                this.setState({Announcements: data});
                this.getAnnouncements();
            })
            .catch((err) => {
                console.log(err);
                this.getAnnouncements();
            });
    }

    render(){
        return (
            <div className="container">
                <br></br>
                <h1 className="page-header">Admin Portal</h1>
                <hr></hr>
                <AnnouncementModal Announcements={this.state.Announcements}/>
            </div>
        );
    }
    
}

export default Admin;