import React from 'react';
import Login from './Login';
import Register from "./Register";
import "./Auth.css";
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';

export interface AuthProps {
    updateToken: Function
}

export interface AuthState {
    showLogin: boolean
}

class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {
            showLogin: true
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        this.setState({ showLogin: !this.state.showLogin })
    }
    render() {
        return (

            <div style={{ backgroundColor: '#004751' }} className="authContainer">
                <div className="titleBox">
                    <h1 style={{ fontSize: "10vh" }}>Welcome to Mood & Muse</h1>
                    <h2>A place to observe your mood and mental health goals</h2>
                    <h4>Gain a deeper understanding of yourself and your emotions</h4>
                    <br />

                </div>

                {this.state.showLogin ? (
                    <Register updateToken={this.props.updateToken} />
                ) : (
                    <Login updateToken={this.props.updateToken} />
                )}
                <div className="toggleButtons">
                    {this.state.showLogin ? (
                        <Button className="Authbutton" onClick={(e) => { this.handleToggle(e) }}>Already a member? Login here.</Button>
                    ) : (
                        <Button className="Authbutton" onClick={(e) => { this.handleToggle(e) }}>New here? Signup here!</Button>
                    )}
                </div>
            </div>

        )
    }
}

export default Auth;