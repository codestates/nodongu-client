import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Components/login/login';
import './Components/login/login.css';

class App extends Component {
  state = {
    isLoading: null,
    userInfo: null,
  };

  handleLogin = (email, password) => {
    // console.log(email, password);
    axios
      .post(`${process.env.REACT_APP_API_KEY}/nod/user/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.success === true) {
          this.setState({ userInfo: response.data.userId });
        } else {
          console.log('login fail');
        }
      });
  };

  render() {
    return <Login onLogin={this.handleLogin} />;
  }
}

export default App;
