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
import Cookies from 'js-cookie';

class App extends Component {
  state = {
    isLoading: false,
    userInfo: {
      id: null,
      nickname: '',
      email: '',
    },
    myList: [],
    musicList: [],
    refreshToken: Cookies.get('refreshToken'),
  };

  logoutUser = () => {
    this.setState({
      userInfo: {},
    });
  };

  updateUserInfo = (userInfo) => {
    this.setState({
      userInfo: userInfo,
    });
  };

  updateMyList = (musicList) => {
    this.setState({
      musicList: musicList,
    });
  };

  handleSignUp = (userInfo) => {
    axios
      .post(`/nod/user/signup`, {
        ...userInfo,
      })
      .then((response) => {
        if (response.data.id) {
          console.log('signup success');
        } else {
          console.log('signup fail');
        }
      });
  };

  handleUserInfo = (userId) => {
    axios.post(`/nod/user/userinfo`, { userId }).then((response) => {
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
    this.setState({ musicList: myList });
  };

  render() {
    return (
      <Suspense fallback={<Loading />}>
        <Navbar userData={this.state.userInfo} logoutUser={this.logoutUser} />
        <Switch>
          <Route
            exact
            path='/'
            render={() => <Login onUserInfo={this.handleUserInfo} />}
          />
          <Route
            exact
            path='/signup'
            render={() => <Signup onSignUp={this.handleSignUp} />}
          />
          <Route
            exact
            path='/keyword'
            render={() => <Keyword updateMyList={this.updateMyList} />}
          />
          <Route
            exact
            path='/editUserInfo'
            render={() => (
              <EditUserInfo
                userInfo={this.state.userInfo}
                updateUserInfo={this.updateUserInfo}
              />
            )}
          />
          <Route
            exact
            path='/mainPlayer'
            render={() => <MainPlayer musicList={this.state.musicList} />}
          />
          <Route
            exact
            path='/myList'
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
