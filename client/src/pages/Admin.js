import React from "react";
import AccountModal from "../components/admin/AccountModal";
import AnnouncementModal from "../components/admin/AnnouncementModal";
import ContestModal from "../components/admin/ContestModal";

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
        //Setup contests
        await fetch(process.env.REACT_APP_SERVER + "/contests/")
            .then((res) => res.json())
            .then((data) => this.setState({Contests: data}))
            .catch((err) => console.log(err));
            //Setup contests
        await fetch(process.env.REACT_APP_SERVER + "/accounts/")
            .then((res) => res.json())
            .then((data) => this.setState({Accounts: data}))
            .catch((err) => console.log(err));
        //Begin long polling
        this.getAnnouncements();
        this.getContests();
        this.getAccounts();
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

    //Long polling for contests
    async getContests() {
        await fetch(process.env.REACT_APP_SERVER + "/contests/long")
            .then((res) => res.json())
            .then((data) => {
                this.setState({Contests: data});
                this.getContests();
            })
            .catch((err) => {
                console.log(err);
                this.getContests();
            });
    }

    //Long polling for accounts
    async getAccounts() {
        await fetch(process.env.REACT_APP_SERVER + "/accounts/long")
            .then((res) => res.json())
            .then((data) => {
                this.setState({Accounts: data});
                this.getAccounts();
            })
            .catch((err) => {
                console.log(err);
                this.getAccounts();
            });
    }

    render(){
        return (
            <div className="container">
                <br></br>
                <h1 className="page-header">Admin Portal</h1>
                <hr></hr>
                <div className="container">
                    <AnnouncementModal Announcements={this.state.Announcements}/>
                    <ContestModal Contests={this.state.Contests}/>
                    <AccountModal Accounts={this.state.Accounts}/>
                </div>
                
            </div>
        );
    }
    
}

export default Admin;