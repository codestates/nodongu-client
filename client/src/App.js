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
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.withCredentials = true;

class App extends Component {
  state = {
    userInfo: {
      id: null,
      nickname: '',
      email: '',
    },
    myList: [],
    musicList: [],
    refreshToken: Cookies.get('refreshToken'),
    keyword: '',
  };

  updateKeyword = (keyword) => {
    this.setState({
      keyword,
    });
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
      .post(`${process.env.REACT_APP_API_URL}/nod/user/signup`, {
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
    const config = {
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/nod/user/userinfo`,
      data: {
        userId,
      },
    };
    axios(config).then((response) => {
      console.log(response);
      if (response.data.success) {
        this.setState({ userInfo: { ...response.data.data } });
      } else {
        this.setState({
          userInfo: {
            id: null,
            nickname: '',
            email: '',
          },
        });
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
            render={() => (
              <Login
                updateUserInfo={this.updateUserInfo}
                onUserInfo={this.handleUserInfo}
              />
            )}
          />
          <Route
            exact
            path='/signup'
            render={() => (
              <Signup
                updateUserInfo={this.updateUserInfo}
                onSignUp={this.handleSignUp}
              />
            )}
          />
          <Route
            exact
            path='/keyword'
            render={() => (
              <Keyword
                updateUserInfo={this.updateUserInfo}
                updateMyList={this.updateMyList}
                updateKeyword={this.updateKeyword}
              />
            )}
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
            render={() => (
              <MainPlayer
                updateUserInfo={this.updateUserInfo}
                musicList={this.state.musicList}
                keyword={this.state.keyword}
              />
            )}
          />
          <Route
            exact
            path='/myList'
            render={() => (
              <MyList
                updateUserInfo={this.updateUserInfo}
                userInfo={this.state.userInfo}
                updateMyList={this.updateMyList}
                myList={this.state.myList}
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
