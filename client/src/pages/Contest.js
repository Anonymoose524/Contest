import React from "react";
import ProblemCard from "../components/ProblemCard";

class Contest extends React.Component {
    
    constructor(props){
        super(props);
        this.contestId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
        this.state = {Contest: []};
    }

    async componentDidMount() {
        //Setup problems
        await fetch(process.env.REACT_APP_SERVER + "/contests/" + this.contestId)
            .then((res) => res.json())
            .then((data) => this.setState({Contest: data}))
            .catch((err) => console.log(err));
        //Begin long polling
        this.getProblems();
    }

    //Long polling for problems
    async getProblems() {
        await fetch(process.env.REACT_APP_SERVER + "/contests/long/" + this.contestId)
            .then((res) => res.json())
            .then((data) => {
                this.setState({Contest: data});
                this.getProblems();
            })
            .catch((err) => {
                console.log(err);
                this.getProblems();
            });
    }

    render(){
        if(this.state.Contest.length === 0) return null;
        return(
            <div className="container">
                <br></br>
                <h1>{this.state.Contest.title}</h1>
                <hr></hr>
                {
                    this.state.Contest.problems.map((problem) => {
                        return <ProblemCard
                            title={problem.title}
                            statement={problem.statement}
                        />
                    })
                }
            </div>
        );
    }

}

export default Contest;