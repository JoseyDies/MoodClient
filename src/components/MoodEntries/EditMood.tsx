import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import APIURL from "../../helpers/environment";
//may need to input stylesheet to make modal pop out 

export interface EditMoodProps {
    token: string,
    fetchMoods: Function,
    id: string,
    moodEntry: {
        sleep: string,
        energy: string,
        appetite: string,
        overallMood: string,
        moodText: string,
        id: string
    }
}

export interface EditMoodState {
    modal: boolean,
    sleep: string,
    energy: string,
    appetite: string,
    overallMood: string,
    moodText: string
    
}

class EditMood extends Component<EditMoodProps, EditMoodState> {
    constructor(props: EditMoodProps) {
        super(props);
        this.state = {
            modal: false,
            sleep: this.props.moodEntry.sleep,
            energy: this.props.moodEntry.energy,
            appetite: this.props.moodEntry.appetite,
            overallMood: this.props.moodEntry.overallMood,
            moodText: this.props.moodEntry.moodText
          

        };
        this.UpdateMood = this.UpdateMood.bind(this);
    }

    UpdateMood = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        // let userID = this.state.userID
       
        fetch(`${APIURL}/mood/update/${this.props.id}`, { 
            method: 'PUT',
            body: JSON.stringify({ sleep: this.state.sleep, energy: this.state.energy, appetite: this.state.appetite, overallMood: this.state.overallMood, moodText: this.state.moodText }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        })
            .then(response => response.json())
            .then((updateData) => {
                this.setState({
                    sleep: this.props.moodEntry.sleep,
                    energy: this.props.moodEntry.energy,
                    appetite: this.props.moodEntry.appetite,
                    overallMood: this.props.moodEntry.overallMood,
                    moodText: this.props.moodEntry.moodText
                    
                })
                this.props.fetchMoods()
            })
            .then(() => toast.success("Update Successful!", {
                position: toast.POSITION.TOP_CENTER
              })) 
              .catch(err => console.log(err));
        };

    toggle = () => this.setState({ modal: !this.state.modal });

    render() {
        return (
            <div>
                <Button className='editbtn' onClick={this.toggle}>Edit Mood Entry</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader >Edit Mood Entry</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.UpdateMood(e)}>
                            <FormGroup>
                                <Label htmlFor="sleep">Edit Sleep:</Label>
                                <Input name="sleep" type="select" value={this.state.sleep} onChange={(e) => this.setState({ sleep: e.target.value })} >
                                    <option hidden></option>
                                    <option value="Terrible">Terrible</option>
                                    <option value="Okay">Okay</option>
                                    <option value="Wonderful">Wonderful</option>
                                </Input >
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="energy">Edit Energy:</Label>
                                <Input name="energy" type="select" value={this.state.energy} onChange={(e) => this.setState({ energy: e.target.value })}>
                                    <option hidden></option>
                                    <option value="Low">Low</option>
                                    <option value="Average">Average</option>
                                    <option value="High">High</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="appetite">Edit Appetite:</Label>
                                <Input type="select" name="appetite" value={this.state.appetite} onChange={(e) => this.setState({ appetite: e.target.value })} >
                                    <option hidden></option>
                                    <option value="Low">Low</option>
                                    <option value="Average">Average</option>
                                    <option value="Ravenous">Ravenous</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="overallMood">Edit Overall Mood:</Label>
                                <Input name="overallMood" type="select" value={this.state.overallMood} onChange={(e) => this.setState({ overallMood: e.target.value })} >
                                    <option hidden></option>
                                    <option value="Very sad">Very sad</option>
                                    <option value="Somewhat sad">Somewhat sad</option>
                                    <option value="Neutral">Neutral</option>
                                    <option value="Happy">Happy</option>
                                    <option value="Elated">Elated</option>
                                </Input>
                                <FormGroup>
                                    <Label htmlFor="moodText">Edit text:</Label>
                                    <Input name="moodText" value={this.state.moodText} onChange={(e) => this.setState({ moodText: e.target.value })} />
                                </FormGroup>
                            </FormGroup>
                            <Button className='editbtn' type='submit' onClick={this.toggle}>Submit Changes</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default EditMood;