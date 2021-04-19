import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = async event => {
        event.preventDefault();
        await axios.post('/register', {
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "password2": this.state.password2
        }).then(response => {
            console.log(response);
            this.setState({
                first_name: '',
                last_name: '',
                user_name: '',
                password: '',
                register: true,
                error: false,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                error: true,
                register: false,
            });

        });
    }

    /*onSubmit = e => {
        console.log("sign up ")
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    // Registered successfully
                    this.setState ({
                        first_name: '',
                        last_name: '',
                        user_name: '',
                        password: '',
                        register: true,
                        error: false,
                    });
                    this.props.register(res);
                    this.props.history.push('/');
                } else {
                    this.setState({
                        register: false,
                        error: true,
                    })
                    this.displayError(res.message);
                }
            })
            .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });

      /*  const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        };


        fetch('/register', requestOptions)
            .then(async response => {
              //  const data = await response.json();

                // check for error response
                if (!response.ok) {
                    this.setState ({
                        error: true,
                        register: false,
                    });
                    // get error message from body or default to response status
                    //const error = (data && data.message) || response.status;
                    //return Promise.reject(error);
                } else {
                        this.setState ({
                            first_name: '',
                            last_name: '',
                            user_name: '',
                            password: '',
                            register: true,
                            error: false,
                        });
                    }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

*/
    render() {
        const {errors} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
                        </Link>
                        <div className="col s12" style={{paddingLeft: "11.250px"}}>
                            <h4>
                                <b>Register</b>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                />
                                <label htmlFor="password2">Confirm Password</label>
                            </div>
                            <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};
export default Register;