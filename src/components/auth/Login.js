import React, { Component } from 'react'
import axios from 'axios';
import Registration from './Registration';

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            full_name: "",
            email: "",
            password: "",
            loginErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({

            [event.target.name]:event.target.value
        });
    }
    handleSubmit(event){
        const {
            email,
            password,
        } = this.state;

        axios.post("httpsessions://localhost:3000/",{
            user: {
                email: email,
                password: password
            }
        },
        {withCredentials: true}
        )
        .then(response => {
            console.log("res from login", response)
            if(response.data.logged_in){ //this help to redirect to cart page.
                this.props.handleSuccessfulAuth(response.data);
            }
        })
        .catch(error => {
            console.log("Login error", error);
        });
        event.preventDefault();
    }
    render(){
        return(
            <>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='full_name' placeholder='Name' value={this.state.full_name} onChange={this.handleChange} />
                    <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange} required/>
                    <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} required />
                    <button type='submit'>Login</button>
                </form>
            </div>
            </>
        )
    }
}