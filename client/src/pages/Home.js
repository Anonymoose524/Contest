import React from "react";
import AnnounceCard from "../components/AnnounceCard";

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {Announcements: []};
    }

    componentDidMount() {
        this.refresh = setInterval(
            () => this.getAnnouncements(),
            1000
        );
    }

    async getAnnouncements() {
        fetch("http://localhost:5000/announcements")
            .then(res => res.json())
            .then(res => {
                this.setState({Announcements: res});
                console.log(this.state);
        });
    }

    render() {
        //const announcements = this.state.Announcements.;
        return (
            <div className="container">
                <br></br>
                <h1 className="page-header">Announcements</h1>
                <hr></hr>
                {
                    this.state.Announcements.map(announcement => (
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