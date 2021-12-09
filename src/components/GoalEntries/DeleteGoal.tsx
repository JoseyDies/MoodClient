import { Component } from "react";
import {
     Button
} from 'reactstrap';
import { toast } from 'react-toastify';
import APIURL from "../../helpers/environment";

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
        
        fetch(`${APIURL}/goal/delete/${this.props.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        }).then(() => this.props.fetchGoals())
        .then(() => toast.success("Successfully deleted", {
            position: toast.POSITION.TOP_CENTER
          }))
        .catch(err => console.log(err));
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