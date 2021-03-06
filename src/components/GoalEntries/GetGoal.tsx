import { Component } from "react";
import DeleteGoal from "./DeleteGoal";
import EditGoal from './EditGoal';
import 'react-toastify/dist/ReactToastify.css';
import APIURL from "../../helpers/environment";
// import Home from '../Home/Home';



// import { Form } from 'reactstrap';

type GoalState = {
    // token: string,
    goals: GoalInfo[]
}

type GoalProps = {
    token: string
}

type GoalInfo = {

    twoWeekG: string,
    twoMonthG: string,
    id: string,
    // firstName: string
    //date
};


export default class GetGoal extends Component<GoalProps, GoalState> {
    constructor(props: GoalProps) {
        super(props)

        this.state = {
            goals: [],
        }
        this.fetchGoals= this.fetchGoals.bind(this);
    }

   

    fetchGoals() {
        console.log(this.props.token);
        fetch(`${APIURL}/goal/mygoalentries`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log("Response:", response);

                this.setState({
                    goals: response
                });
                console.log("Goals:", this.state.goals);
            })
            .catch((error) => console.log("fetchGoals Error:", error))
    }



    render() {
        return (
            <div>
                <button onClick={this.fetchGoals}>Past Goal Entries</button>
                {this.state.goals.map((goalEntry: GoalInfo, index: number) => {
                    return (
                        <div key={index}>

                            {goalEntry.twoWeekG}
                            <br />
                            {goalEntry.twoMonthG}
                            <br />
                            <EditGoal token={this.props.token} fetchGoals={this.fetchGoals} id={goalEntry.id} goalEntry={goalEntry} />
                            <DeleteGoal token={this.props.token} fetchGoals={this.fetchGoals} id={goalEntry.id} />
                            {/* <Home token={this.props.token} />  */}
                            {/* firstName={goalEntry.firstName}  */}
                        </div>
                        
                    )
                })}
            </div>
            
        )
    }
};
