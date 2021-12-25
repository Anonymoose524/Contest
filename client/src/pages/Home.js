import React from "react";
import AnnounceCard from "../components/AnnounceCard";
require('dotenv').config();

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('announcements')) || {
            Announcements: []
        };
    }

    setState(state) {
        window.localStorage.setItem('announcements', JSON.stringify(state));
        super.setState(state);
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

    async getAnnouncements() {
        console.log(process.env.REACT_APP_SERVER + "/announcements/long");
        await fetch(process.env.REACT_APP_SERVER + "/announcements/long")
            .then((res) => res.json())
            .then((data) => {
                this.setState({Announcements: data});
                console.log("Polled!");
                this.getAnnouncements();
            })
            .catch((err) => {
                console.log(err);
                this.getAnnouncements();
            });
    }

    render() {
        return (
            <div className="container">
                <br></br>
                <h1 className="page-header">Announcements</h1>
                <hr />
                {
                    this.state.Announcements.map((announcement) => (
                        <AnnounceCard
                            title={announcement.title} 
                            description={announcement.description}
                        />
                    ))
                }
            </div>
        );
    }

}

export default Home;