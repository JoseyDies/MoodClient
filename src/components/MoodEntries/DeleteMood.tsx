import { Component } from "react";
import {
     Button
} from 'reactstrap';

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
        let APIUrl = 'http://localhost:3000';
        fetch(`${APIUrl}/mood/delete/${this.props.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        }).then(() => this.props.fetchMoods())
    }

    render() {
        return (
            <div>



                <Button onClick={(e) => this.deleteMoodEntry()}>Delete Entry</Button>

            </div>
        )
    }
}

export default DeleteMood;