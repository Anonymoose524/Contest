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
        this.getAnnouncements()
        this.refresh = setInterval(
            () => this.getAnnouncements(),
            1000
        );
    }

    async getAnnouncements() {
        console.log(process.env.REACT_APP_SERVER + "/announcements");
        await fetch(process.env.REACT_APP_SERVER + "/announcements")
            .then(res => res.json())
            .then(data => this.setState({Announcements: data}))
            .catch(err => console.log(err));
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