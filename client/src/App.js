import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Signup from './Components/signup/signup';
import Login from './Components/login/login';
import Navbar from './Components/navbar/navbar';
import Footer from './Components/footer/footer';
import EditUserInfo from './Components/editUserInfo/editUserInfo';
import Loading from './Components/loading/loading';
import Keyword from './Components/keyword/keyword';

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

  handleUserInfo = (userId) => {
    console.log(userId);
    axios
      .post(
        `http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/userinfo`,
        { userId }
      )
      .then((response) => {
        if (response.data.success === 'true') {
          this.setState({ userInfo: { ...response.data.data } });
        } else {
          this.setState({ userInfo: null });
        }
      });
  };
  render() {
    return <EditUserInfo />;
  }
}

export default withRouter(App);
