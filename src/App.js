import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';
// import { logout } from '../features/cartSlice';
// import Registration from './components/auth/Registration';
// import Login from './components/auth/Login';

export default class App extends Component {
  
  constructor(){

    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      loginPage: true
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSessions = this.handleSessions.bind(this);
  }

  checkLoginStatus() {
    axios.get("http://localhost:3000/logged_in",{ withCredentials: true}).then(response => {
      console.log("logged in?", response);
      if(response.data.logged_in &&  this.state.loggedInStatus ==="NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
        localStorage.setItem("emailAddress", response.data.user.email);
      }else if(!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("check login error", error);
    });
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      loginPage: true
    });
  }


  handleSessions(newState){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      loginPage: newState
    });
  }

  handleLogin(data){
    this.setState({
      loggedInStatus:"LOGGED_IN",
      user: data.user,
      loginPage: true
    })
    localStorage.setItem("emailAddress", data.user.email);
    console.log(this.state.user.email)
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ToastContainer/>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home loginPage={this.state.loginPage} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} handleSessions= {this.handleSessions} />} />
            <Route path='/cart' element={<Cart loggedInStatus={this.state.loggedInStatus} />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/not-found' />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
