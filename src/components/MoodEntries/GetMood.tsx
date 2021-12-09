import { Component } from "react";
import DeleteMood from "./DeleteMood";
import EditMood from "./EditMood";
import 'react-toastify/dist/ReactToastify.css';
import APIURL from "../../helpers/environment";

// import { Form } from 'reactstrap';

type MoodState = {
    // token: string,
    moods: MoodInfo[]
}

type MoodProps = {
    token: string
}

type MoodInfo = {

    sleep: string,
    energy: string,
    appetite: string,
    overallMood: string,
    moodText: string,
    id: string
    //date
};


export default class GetMood extends Component<MoodProps, MoodState> {
    constructor(props: MoodProps) {
        super(props)

        this.state = {
            moods: [],
        }
        this.fetchMoods = this.fetchMoods.bind(this);
    }

   

    fetchMoods() {
        console.log(this.props.token);
        
     
        fetch(`${APIURL}/mood/mymoodentries`, {
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
                    moods: response
                });
                console.log("Moods:", this.state.moods);
            })
            .catch((error) => console.log("fetchMoods Error:", error))
    }

    // componentWillMount() {
    //     
    // };



    render() {
        return (
            <div>
                <button onClick={this.fetchMoods}>Past Mood Entries</button>
                {this.state.moods.map((moodEntry: MoodInfo, index: number) => {
                    return (
                        <div key={index}>
                        

                            {moodEntry.sleep}
                            <br />
                            {moodEntry.energy}
                            <br />
                            {moodEntry.appetite}
                            <br />
                            {moodEntry.overallMood}
                            <br />
                            {moodEntry.moodText}
                            <EditMood token={this.props.token} fetchMoods={this.fetchMoods} id={moodEntry.id} moodEntry={moodEntry} />
                            <DeleteMood token={this.props.token} fetchMoods={this.fetchMoods} id={moodEntry.id} />

                        </div>
                    )
                })}
            </div>
        )
    }
};



