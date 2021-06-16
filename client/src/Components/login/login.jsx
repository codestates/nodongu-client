import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import './login.css';
import Loading from '../loading/loading';

class Login extends Component {
  state = {
    isLoading: false,
  };

  formRef = React.createRef();
  inputEmailRef = React.createRef();
  inputPawRef = React.createRef();

  handleLogin = (email, password) => {
    console.log(email, password);
    // this.props.onUserInfo({ userId: 7 });
    this.setState({
      isLoading: true,
    })
    axios
      .post(
        `http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/login`,
        {
          email,
          password,
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.loginSuccess) {
          this.props.onUserInfo(response.data.userId);
          this.setState({
            isLoading: false,
          })
          return this.props.history.push('/keyword');
        }
        this.setState({
            isLoading: false,
          })
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const email = this.inputEmailRef.current.value;
    const password = this.inputPawRef.current.value;

    email && password && this.handleLogin(email, password);
    this.formRef.current.reset();
  };

  render() {
    return this.state.isLoading ? <Loading />
    : (
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-form-title">Login</h1>
          <form className="form" ref={this.formRef} onSubmit={this.onSubmit}>
            <div className="input-form">
              <label htmlFor="email">
                <i className="fas fa-envelope login-icon"></i>
              </label>
              <input
                ref={this.inputEmailRef}
                id="email"
                type="email"
                placeholder="E-mail address"
                className="login-form-email-input"
              />
            </div>
            <div className="input-form">
              <label htmlFor="password">
                <i className="fas fa-key login-icon"></i>
              </label>
              <input
                ref={this.inputPawRef}
                id="password"
                type="password"
                placeholder="Password"
                className="login-form-pwd-input"
              />
            </div>
            <button className="login-btn">Login</button>
          </form>
          <span
            className="sing-up-link"
            onClick={() => {
              this.props.history.push('/signup');
            }}
          >
            아직 회원이 아니신가요?
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
