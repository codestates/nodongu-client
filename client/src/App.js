import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
// import Login from './Components/login/login';
// import Signup from './Components/signup/signup';
// import './Components/login/login.css';
// import './Components/signup/signup.css';
import Navbar from './Components/navbar/navbar';
import './Components/navbar/navbar.css';

class App extends Component {
  state = {
    isLoading: null,
    userInfo: null,
  };

  handleLogin = (email, password) => {
    console.log(email, password);
    axios
      .post(`http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          console.log('성공 ');
          this.setState({ userInfo: response.data.userId });
        } else {
          console.log('login fail');
        }
      });
  };

  handleSignUp = (userInfo) => {
    console.log(userInfo);
    axios
      .post(`http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/signup`, {
        ...userInfo,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          console.log('signup success');
        } else {
          console.log('signup fail');
        }
      });
  };

  render() {
    return <Navbar userInfo={this.state.userInfo} />;
    // return <Signup onSignUp={this.handleSignUp} />;
    // return <Login onLogin={this.handleLogin} />;
  }
}

export default App;
