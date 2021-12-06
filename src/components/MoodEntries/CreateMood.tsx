
import React, { Component, FormEvent } from "react";
import { Input, FormGroup } from 'reactstrap';


//APPEARS TO BE MOSTLY SUCCESSFUL. CONTINUE TESTING. ADD ALERTS FOR ERRORS AND COMFIRMATION

export interface MoodEntryCreateProps {
    token: string;
}

export interface MoodEntryCreateState {
    sleep: string,
    energy: string,
    appetite: string,
    overallMood: string,
    moodText: string
    //date: string
}
class CreateMood extends Component<MoodEntryCreateProps, MoodEntryCreateState> {
    constructor(props: MoodEntryCreateProps) {
        super(props);
        this.state = {
            sleep: '',
            energy: '',
            appetite: '',
            overallMood: '',
            moodText: ''
        }
    }
  

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(this.props.token)

        let APIUrl = 'http://localhost:3000';
        fetch(`${APIUrl}/mood/create`, {
            method: 'POST',
            body: JSON.stringify({ sleep: this.state.sleep, energy: this.state.energy, appetite: this.state.appetite, overallMood: this.state.overallMood, moodText: this.state.moodText }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    sleep: "",
                    energy: "",
                    appetite: "",
                    overallMood: "",
                    moodText: "",
                    
                })

            })
    }

    render() {
        return (
            <div className='mood-create-wrapper'>
                <div className='mood-create-form-wrapper'>
                    <h2>How am I feeling today?</h2>
                    <form onSubmit={this.handleSubmit} >
                        <div className='sleepDiv'>
                            <label htmlFor='sleep'>How's my sleep?</label>
                            <br></br>
                            <Input type='select' name='sleep' value={this.state.sleep} onChange={(e) => this.setState({ sleep: String(e.target.value) })} >
                                <option hidden></option>
                                <option value="Terrible">Terrible</option>
                                <option value="Okay">Okay</option>
                                <option value="Wonderful">Wonderful</option>
                            </Input>
                        </div>
                        <div className='energyDiv'>
                            <label htmlFor='energy'>How's my energy?</label>
                            <br></br>
                            <Input type='select' name='energy' value={this.state.energy} onChange={(e) => this.setState({ energy: String(e.target.value) })} >
                                <option hidden></option>
                                <option value="Low">Low</option>
                                <option value="Average">Average</option>
                                <option value="High">High</option>
                            </Input>
                        </div>
                        <div className='appetiteDiv'>
                            <label htmlFor='appetite'>How's my appetite?</label>
                            <br></br>
                            <Input type='select' name='appetite' value={this.state.appetite} onChange={(e) => this.setState({ appetite: String(e.target.value) })} >
                                <option hidden></option>
                                <option value="Low">Low</option>
                                <option value="Average">Average</option>
                                <option value="Ravenous">Ravenous</option>
                            </Input>
                        </div>
                        <div className='overallMoodDiv'>
                            <label htmlFor='overallMood'>What's my overall mood today?</label>
                            <br></br>
                            <Input type='select' name='overallMood' value={this.state.overallMood} onChange={(e) => this.setState({ overallMood: String(e.target.value) })} >
                                <option hidden></option>
                                <option value="Very sad">Very sad</option>
                                <option value="Somewhat sad">Somewhat sad</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Happy">Happy</option>
                                <option value="Elated">Elated</option>
                            </Input>
                            <div className="moodTextDiv">
                            <label htmlFor='moodText'>What else am I feeling?</label>
                            <br></br>
                                <FormGroup>
                                   
                                    <Input type='textarea' name='moodText' value={this.state.moodText} onChange={(e) => this.setState({ moodText: String(e.target.value) })} ></Input>
                                </FormGroup>
                            </div>
                        </div>

                        <div className='submit'>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
               
            </div>
     
        );
    }


}

export default CreateMood;

