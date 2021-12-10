import React, { Component, FormEvent } from "react";
import { Input, FormGroup } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIURL from "../../helpers/environment";


//APPEARS TO BE MOSTLY SUCCESSFUL. CONTINUE TESTING. ADD ALERTS FOR ERRORS AND COMFIRMATION

export interface GoalEntryCreateProps {
    token: string;
}

export interface GoalEntryCreateState {
    twoWeekG: string,
    twoMonthG: string
    //date: string
}
class CreateGoal extends Component<GoalEntryCreateProps, GoalEntryCreateState> {
    constructor(props: GoalEntryCreateProps) {
        super(props);
        this.state = {
           twoWeekG: '',
           twoMonthG: ''
        }
    }
  

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(this.props.token)

    
        fetch(`${APIURL}/goal/create`, {
            method: 'POST',
            body: JSON.stringify({ twoWeekG: this.state.twoWeekG, twoMonthG: this.state.twoMonthG }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    twoWeekG: '',
                    twoMonthG: ''                  
                })
                toast.success("Submission Successful!", {
                    position: toast.POSITION.TOP_CENTER
                  })
            })
            .catch(err => console.log(err))
        }

    render() {
        return (
            <div className='goal-create-wrapper'>
                <div className='goal-create-form-wrapper'>
                    <form onSubmit={this.handleSubmit} >
                        <div className='twoGDiv'>
                            <label htmlFor='twoWeekG'>What is my two-week goal?</label>
                            <br></br>
                            <FormGroup>
                                    <Input type='textarea' name='twoWGText' value={this.state.twoWeekG} onChange={(e) => this.setState({ twoWeekG: String(e.target.value) })} ></Input>
                                </FormGroup>
                        </div>
                        <div className='twoMDiv'>
                            <label htmlFor='twoMonthG'>What is my two-month goal?</label>
                            <br></br>
                            <FormGroup>
                                    <Input type='textarea' name='twoMGText' value={this.state.twoMonthG} onChange={(e) => this.setState({ twoMonthG: String(e.target.value) })} ></Input>
                                </FormGroup>
                        </div>
                        <div className='submit'>
                            <button>Submit</button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
     
        );
    }


}

export default CreateGoal;