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
import MyList from './Components/myList/myList';
import MainPlayer from './Components/mainPlayer/mainPlayer';

class App extends Component {
  state = {
    isLoading: null,
    userInfo: null,
  };

  handleSignUp = (userInfo) => {
    console.log(userInfo);
    axios
      .post(
        `http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/signup`,
        {
          ...userInfo,
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.id) {
          console.log('signup success');
        } else {
          console.log('signup fail');
        }
      });
  };

  handleUserInfo = (userId) => {
    axios
      .post(
        `http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/userinfo`,
        { userId }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.setState({ userInfo: { ...response.data.data } });
        } else {
          this.setState({ userInfo: null });
        }
      });
  };

  // logout handler

  render() {
    return (
      <Suspense fallback={<Loading />}>
        <Navbar userData={this.state.userInfo} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Login onUserInfo={this.handleUserInfo} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup onSignUp={this.handleSignUp} />}
          />
          <Route exact path="/keyword" component={Keyword} />
          <Route exact path="/editUserInfo" component={EditUserInfo} />
          <Route exact path="/mainPlayer" component={MainPlayer} />
        </Switch>
        <Footer />
      </Suspense>
    );
  }
}

export default withRouter(App);
