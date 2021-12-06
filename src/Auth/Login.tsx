import React, { Component } from 'react';

export interface LoginProps {
    updateToken: Function

}

export interface LoginState {
    email: string,
    password: string,
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
            let APIUrl = 'http://localhost:3000';
            fetch(`${APIUrl}/user/login`, {
                method: 'POST',
                body: JSON.stringify({ email: this.state.email, password: this.state.password }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log(data.sessionToken)

                    if (data.sessionToken !== undefined) {
                        this.props.updateToken(data.sessionToken) 
                    } else {
                        alert('Please try again.');
                    }
                    
                })
        } else {
            alert('Please ensure your email and password meet the criteria')
        }
    }

    // {this.state.showLogin ? (
    //     <Register updateToken={this.props.updateToken} /> 
    //     ) : (
    //     <Login updateToken={this.props.updateToken} />  
    //     )}
    render() {
        // const { errors } = this.state
        return (

            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>Log In</h2>
                    <form onSubmit={this.handleSubmit} noValidate >
                        <div className='email'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' onChange={this.handleChange} />
                        </div>
                        <div className='password'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' onChange={this.handleChange} />
                            {/* {errors.password.length > 0 && <span style={{ color: 'red' }}>{errors.password}</span>} */}
                        </div>
                        <div className='submit'>
                            <button>Log In</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default Login;