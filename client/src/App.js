import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Components/login/login';
// import Signup from './Components/signup/signup';
import './Components/login/login.css';
// import './Components/signup/signup.css';

class App extends Component {
  state = {
    isLoading: null,
    userInfo: null,
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

  handleUserInfo = (userInfo) => {
    console.log(userInfo);
    this.setState({ userInfo });
  };
  render() {
    // return <Signup onSignUp={this.handleSignUp} />;
    return <Login onUserInfo={this.handleUserInfo} />;
  }
}

export default App;
