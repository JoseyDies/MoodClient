import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import APIURL from "../../helpers/environment";
//may need to input stylesheet to make modal pop out 

export interface EditGoalProps {
    token: string,
    fetchGoals: Function,
    id: string,
    goalEntry: {
       twoWeekG: string,
       twoMonthG: string,
        id: string
    }
}

export interface EditGoalState {
    modal: boolean,
    twoWeekG: string,
    twoMonthG: string
    
}

class EditGoal extends Component<EditGoalProps, EditGoalState> {
    constructor(props: EditGoalProps) {
        super(props);
        this.state = {
            modal: false,
            twoWeekG: this.props.goalEntry.twoWeekG,
            twoMonthG: this.props.goalEntry.twoMonthG
        };
        this.UpdateGoal = this.UpdateGoal.bind(this);
    }

    UpdateGoal = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
     
        fetch(`${APIURL}/goal/updategoal/${this.props.id}`, { 
            method: 'PUT',
            body: JSON.stringify({ twoWeekG: this.state.twoWeekG, twoMonthG: this.state.twoMonthG  }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            })
        })
            .then(response => response.json())
            .then((updateData) => {
                this.setState({
                   twoWeekG: '',
                   twoMonthG: ''
                    
                })
                this.props.fetchGoals()
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
                <Button className='editbtn' onClick={this.toggle}>Edit Goal Entry</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader >Edit Goal Entry</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.UpdateGoal(e)}>
                        <FormGroup>
                                    <Label htmlFor="twoMG">Edit two-month goal:</Label>
                                    <Input name="twoMG" value={this.state.twoMonthG} onChange={(e) => this.setState({ twoMonthG: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="twoWG">Edit two-week goal:</Label>
                                    <Input name="twoWG" value={this.state.twoWeekG} onChange={(e) => this.setState({ twoWeekG: e.target.value })} />
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

export default EditGoal;