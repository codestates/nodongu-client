import React, { Component } from 'react';
import './login.css';
import axios from 'axios';

class Login extends Component {
  formRef = React.createRef();
  inputEmailRef = React.createRef();
  inputPawRef = React.createRef();

  handleLogin = (email, password) => {
    console.log(email, password);
    // this.props.onUserInfo({ userId: 7 });
    axios
      .post(`http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          console.log('성공 ');
          this.props.onUserInfo(response.data.userId);
        } else {
          console.log('login fail');
        }
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
    return (
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <form ref={this.formRef} onSubmit={this.onSubmit}>
            <div className="input-form">
              <label htmlFor="email">
                <i className="fas fa-envelope login-icon"></i>
              </label>
              <input
                ref={this.inputEmailRef}
                id="email"
                type="email"
                placeholder="E-mail address"
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
              />
            </div>
            <button className="login-btn">Login</button>
          </form>
          <span className="sing-up-link">아직 회원이 아니신가요?</span>
        </div>
      </div>
    );
  }
}

export default Login;
