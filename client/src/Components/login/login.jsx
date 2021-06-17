import React, { PureComponent } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import './login.css';
import Loading from '../loading/loading';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

class Login extends PureComponent {
  constructor(props) {
    super(props);
    const authorization = Cookies.get('authorization');
    console.log(authorization);
    axios
      .get(
        'http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/auth',
        {
          headers: {
            authorization: authorization ? authorization : '',
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.success);
          console.log(response.data.userInfo);
          this.props.updateUserInfo(response.data.userInfo);
          return this.props.history.push('/keyword');
        }
        console.log(response.data.success);
      });
  }

  state = {
    isLoading: false,
  };

  formRef = React.createRef();
  inputEmailRef = React.createRef();
  inputPawRef = React.createRef();
  loginEmailErrRef = React.createRef();
  loginPwdErrRef = React.createRef();

  handleLogin = (email, password) => {
    /*     this.setState({
      isLoading: true,
    }); */

    const config = {
      method: 'POST',
      url: 'http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/login',
      data: {
        email,
        password,
      },
    };

    axios(config).then((response) => {
      if (response.data.loginSuccess) {
        Cookies.set('authorization', response.headers.authorization);
        this.props.onUserInfo(response.data.userId);
        return this.props.history.push('/keyword');
      } else if (response.data.message === '존재하지 않는 이메일입니다') {
        this.loginEmailErrRef.current.classList.remove('login-err-hidden');
      } else if (response.data.message === '비밀번호가 일치하지 않습니다') {
        this.loginPwdErrRef.current.classList.remove('login-err-hidden');
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.loginEmailErrRef.current.classList.add('login-err-hidden');
    this.loginPwdErrRef.current.classList.add('login-err-hidden');

    const email = this.inputEmailRef.current.value;
    const password = this.inputPawRef.current.value;

    email && password && this.handleLogin(email, password);
    this.formRef.current.reset();
  };

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-form-title">Login</h1>
                    <form
            className="form"
            ref={this.formRef}
            onSubmit={this.onSubmit}
            method="POST"
          >
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
            <div className="login-err">
              <p
                ref={this.loginEmailErrRef}
                className="email-err login-err-hidden"
              >
                가입이 안 되어있는 이메일입니다. 가입먼저 해주세요 :)
              </p>
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
            <div className="login-err">
              <p
                ref={this.loginPwdErrRef}
                className="password-err login-err-hidden"
              >
                비밀번호가 일치하지 않습니다 :( 비밀번호를 제대로 입력해주세요
                :)
              </p>
            </div>
            <button className="login-btn">Login</button>
          </form>
          <span
            className='sing-up-link'
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
