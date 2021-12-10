import React, { Component } from 'react';
import APIURL from '../../helpers/environment';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

export interface LoginProps {
    updateToken: Function,
    // role: string

}

export interface LoginState {
    email: string,
    password: string,
    // role: string
    errors: {
        password: string
    }
}

const Regex = RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        const initialState = {
            email: '',
            password: '',
            role: '',
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
                errors.password = Regex.test(value) ? '' : 'Password must be at least 8 characters and include at least 1 number, 1 upper case letter, 1 lower case letter, and 1 special character'
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

            fetch(`${APIURL}/user/login`, {
                method: 'POST',
                body: JSON.stringify({ email: this.state.email, password: this.state.password }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })

            })
                .then(response => response.json())
                .then(data => {

                    if (data.sessionToken !== undefined) {
                        this.props.updateToken(data.sessionToken, data.user.role)

                    } else {
                        alert('Please try again.');
                    }
                }).catch(err => console.log(err));
        } else {
            alert('Please ensure your email and password meet the criteria')
        }
    }
    render() {

        return (

            <div className='wrapper'>
                <div className='form-wrapper'>
                    <Form  onSubmit={this.handleSubmit} noValidate >
                        <div className='email'>
                            <Label style={{color: '#fff5ee'}}for='email'>Email</Label>
                            <br/>
                            <Input  type='text' name='email' onChange={this.handleChange} />
                        </div>
                        <br />
                        <div className='password'>
                            <Label style={{color: '#fff5ee'}} for='password'>Password  </Label>
                            <br/>
                            <Input  type='password' name='password' onChange={this.handleChange} />
                        </div>
                        <br />
                        <Button>Log In</Button>

                    </Form>
                </div>
            </div>

        );
    }
}

export default Login;