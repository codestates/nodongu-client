import React, { Component } from 'react';

class Login extends Component {
  formRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="login-form">
        <h1>Login</h1>
        <form ref={this.formRef} onSubmit={this.onSubmit}>
          <div className="input-form">
            <i className="fas fa-envelope login-icon"></i>
            <input type="email" placeholder="E-mail address" />
          </div>
          <div className="input-form">
            <i className="fas fa-key login-icon"></i>
            <input type="password" placeholder="Password" />
          </div>
          <button className="login-btn">Login</button>
        </form>
        <span className="singup-link">아직 회원이 아니신가요?</span>
      </div>
    );
  }
}

export default Login;
