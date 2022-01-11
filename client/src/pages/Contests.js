import React from "react";
import ContestCard from "../components/ContestCard";

class Contests extends React.Component {

    constructor(props){
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('contests')) || {
            Contests: []
        };
    }

    setState(state) {
        window.localStorage.setItem('contests', JSON.stringify(state));
        super.setState(state);
    }

    async componentDidMount() {
        //Setup contests
        await fetch(process.env.REACT_APP_SERVER + "/contests/")
            .then((res) => res.json())
            .then((data) => {
                data[0].start = new Date(data[0].start);
                data[0].end = new Date(data[0].end);
                this.setState({Contests: data});
            }).catch((err) => console.log(err));
        //Begin long polling
        this.getContests();
    }

    //Long polling for contests
    async getContests() {
        await fetch(process.env.REACT_APP_SERVER + "/contests/long")
            .then((res) => res.json())
            .then((data) => {
                data[0].start = new Date(data[0].start);
                data[0].end = new Date(data[0].end);
                this.setState({Contests: data});
                this.getContests();
            })
            .catch((err) => {
                console.log(err);
                this.getContests();
            });
    }

    render() {
        return (
            <div className = "container">
                <br></br>
                <h1 className="page-header">Contests</h1>
                <hr></hr>
                {
                    this.state.Contests.map((contest) => (
                        <ContestCard
                            title={contest.title} 
                            start={contest.start}
                            end={contest.end}
                            description={contest.description}
                        />
                    ))
                }
            </div>
        );
    }

}

export default Contests;