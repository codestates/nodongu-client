import React, { Component } from 'react';

class Login extends Component {
  formRef = React.createRef();
  inputEmailRef = React.createRef();
  inputPawRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const email = this.inputEmailRef.current.value;
    const password = this.inputPawRef.current.value;

    email && password && this.props.onLogin(email, password);
    this.formRef.current.reset();
  };

  render() {
    return (
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
    );
  }
}

export default Login;
