import React from "react";
import AccountModal from "../components/admin/AccountModal";
import AnnouncementModal from "../components/admin/AnnouncementModal";
import ContestModal from "../components/admin/ContestModal";
import {CodeSquareIcon, MegaphoneIcon, PersonIcon} from '@primer/octicons-react'

class Admin extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            Announcements: null,
            Contests: null,
            Accounts: null
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
        if(!(this.state.Announcements && this.state.Accounts && this.state.Contests)) return null;
        return (
            <div className="container">
                <br></br>
                <h1 className="page-header">Admin Portal</h1>
                <hr></hr>
                <div className="card">
                    <div className="card-header">
                        <h3>Dashboard</h3>
                    </div>
                    <div className="card-body" style={{display:"inline-flex"}}>
                        <div className="col-md-3 mx-auto">
                            <div className="card card-body bg-light">
                                <div className="grid">
                                    <div className="row text-center">
                                    <MegaphoneIcon size={"medium"} />
                                    <h3>{this.state.Announcements.length + " Announcements"}</h3>
                                    <AnnouncementModal Announcements={this.state.Announcements}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mx-auto">
                            <div className="card card-body bg-light">
                                <div className="grid">
                                    <div className="row text-center">
                                    <CodeSquareIcon size={"medium"}/>
                                    <h3>{this.state.Contests.length + " Contests"}</h3>
                                    <ContestModal Contests={this.state.Contests}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mx-auto">
                            <div className="card card-body bg-light">
                                <div className="grid">
                                    <div className="row text-center">
                                    <PersonIcon size={"medium"}/>
                                    <h3>{this.state.Accounts.length + " Accounts"}</h3>
                                    <AccountModal Accounts={this.state.Accounts}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Admin;