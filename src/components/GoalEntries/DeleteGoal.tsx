import { Component } from "react";
import {
     Button
} from 'reactstrap';

export interface DeleteGoalProps {
    token: string,
    fetchGoals: Function,
    id: string
}



class DeleteGoal extends Component<DeleteGoalProps, {}> {
    constructor(props: DeleteGoalProps) {
        super(props);
        this.state = {};
    }
    deleteGoalEntry = () => {
        const deleteWarning = window.confirm("Are you sure you want to delete this user? This is a permanent action that cannot be undone.");
       if (deleteWarning) {
        let APIUrl = 'http://localhost:3000';
        fetch(`${APIUrl}/goal/delete/${this.props.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        }).then(() => this.props.fetchGoals())
    }}

    render() {
        return (
            <div>



                <Button onClick={(e) => this.deleteGoalEntry()}>Delete Entry</Button>

            </div>
        )
    }
}

export default DeleteGoal;