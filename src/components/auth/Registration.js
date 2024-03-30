import React, { Component } from 'react'
import axios from 'axios';

export default class Registration extends Component{
    constructor(props){
        super(props);

        this.state = {
            full_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({

            [event.target.name]:event.target.value
        })
    }
    handleSubmit(event){
        const {
            email,
            password,
            password_confirmation
        } = this.state;

        axios.post("http://localhost:3000/registrations",{
            user: {
                full_name: this.state.full_name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        },
        {withCredentials: true}
        )
        .then(response => {
            if(response.data.status === 'created'){ //this help to redirect to cart page.
                this.props.handleSuccessfulAuth(response.data);
            }
        })
        .catch(error => {
            console.log("registration error", error);
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
                    <input type='password' name='password_confirmation' placeholder='Password confirmation' value={this.state.password_confirmation} onChange={this.handleChange} required />
                    <button type='submit'>Register</button>
                </form>
            </div>
            </>
        )
    }
}