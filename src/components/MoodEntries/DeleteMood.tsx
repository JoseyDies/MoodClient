import { Component } from "react";
import {
     Button
} from 'reactstrap';
import { toast } from 'react-toastify';
import APIURL from "../../helpers/environment";

export interface DeleteMoodProps {
    token: string,
    fetchMoods: Function,
    id: string
}



class DeleteMood extends Component<DeleteMoodProps, {}> {
    constructor(props: DeleteMoodProps) {
        super(props);
        this.state = {};
    }
    deleteMoodEntry = () => {
        const deleteWarning = window.confirm("Are you sure you want to delete this user? This is a permanent action that cannot be undone.");
        if (deleteWarning) {
        
        fetch(`${APIURL}/mood/delete/${this.props.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        }).then(() => this.props.fetchMoods())
        .then(() => toast.success("Successfully deleted", {
            position: toast.POSITION.TOP_CENTER
          }))
        .catch(err => console.log(err));
    }}

    render() {
        return (
            <div>



                <Button onClick={(e) => this.deleteMoodEntry()}>Delete Entry</Button>

            </div>
        )
    }
}

export default DeleteMood;