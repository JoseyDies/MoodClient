import React, { Component } from 'react';
import APIURL from '../../helpers/environment';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';


interface RegisterProps {
    updateToken: Function
}

interface RegisterState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,

    errors: {
        password: string
    }
}
const Regex = RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

class Register extends Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        const initialState = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            // role: '',

            errors: {
                password: ''
            }
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'password':
                errors.password = Regex.test(value) ? '' : 'Password must be at least 8 characters and include at least 1 number, 1 upper case letter, 1 lower case letter, and 1 special character.'
                break;
            default:
                break;
        }
        this.setState(Object.assign(this.state, { errors, [name]: value }));
        console.log(this.state.errors);
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let validity = true;
        Object.values(this.state.errors).forEach(
            (val) => val.length > 0 && (validity = false)
        );
        if (validity === true) {

            fetch(`${APIURL}/user/register`, {
                method: 'POST',
                body: JSON.stringify({ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log(data.sessionToken)

                    if (data.sessionToken !== undefined) {
                        this.props.updateToken(data.sessionToken) //, data.user.role
                    } else {
                        alert('Please try again.');
                    }
                    let checkToken = data.sessionToken;
                    if (checkToken === undefined) {
                        alert('Please try again.');
                        return
                    } else {
                        alert('You have successfully signed up!')
                    }
                }).catch(err => console.log(err));
        } else {
            alert('Please ensure password meets the criteria.')
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div className='siteName'>
                <div className='wrapper'>
                    <div className='form-wrapper'>
        
                        <Form onSubmit={this.handleSubmit} noValidate >

                            <FormGroup>
                                <Label style={{color: '#fff5ee'}} for='First Name'>First Name</Label>
                                <br/>
                                <Input  type='text' onChange={(e) => this.handleChange(e)} />

                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label style={{color: '#fff5ee'}} for='lastName'>Last Name</Label>
                                <br/>
                                <Input  type='text' name='lastName' onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label style={{color: '#fff5ee'}} for='email'>Email</Label>
                                <br/>
                                <Input  type='text' name='email' onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label style={{color: '#fff5ee'}} for='password'>Password</Label>
                                <br/>
                                <Input type='password' name='password' onChange={(e) => this.handleChange(e)} />
                                {errors.password.length > 0 && <span style={{ color: 'red' }}>{errors.password}</span>}
                            </FormGroup>
                            <br />
                            <div className='submit'>
                                <Button>Sign Up</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;