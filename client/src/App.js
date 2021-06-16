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
    isLoading: false,
    userInfo: {},
    myList: [],
    musicList: [],
  };

  updateMyList = (musicList) => {
    this.setState({
      musicList: musicList,
    })
  }

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
          return true;
        } else {
          console.log('signup fail');
          return false;
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

  updateMyList = (myList) => {
    this.setState({ myList });
  };

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
          <Route exact path="/keyword" render={() => <Keyword updateMyList={this.updateMyList}/>} />
          <Route
            exact
            path="/editUserInfo"
            render={() => <EditUserInfo userInfo={this.state.userInfo} />}
          />
          <Route exact path="/mainPlayer" render={() => <MainPlayer musicList={this.state.musicList} />} />
          <Route
            exact
            path="/myList"
            render={() => (
              <MyList
                userInfo={this.state.userInfo}
                updateMyList={this.updateMyList}
              />
            )}
          />
        </Switch>
        <Footer />
      </Suspense>
    );
  }
}

export default withRouter(App);
