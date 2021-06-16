import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import './signup.css';
import Loading from '../loading/loading';

class Signup extends Component {
  state = {
    isEmailCheck: false,
    isNickNameCheck: false,
    isPasswordCheck: false,
    isPasswordConfirm: false,
    isLoading: false,
  };

  formRef = React.createRef();
  inputEmailRef = React.createRef();
  inputNickNameRef = React.createRef();
  inputPwdRef = React.createRef();
  inputPwdConfirmRef = React.createRef();

  // [유효성 검증 함수]: email check
  onValidateEmail = (str) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(str).toLowerCase());
  };

  // 1. email onChange event handler(DB에 등록되어 있는 지 확인 필요)
  onExistEmailCheck = (e) => {
    // 1. email validation check
    if (this.onValidateEmail(this.inputEmailRef.current.value)) {
      // axios config
      const config = {
        method: 'post',
        url: 'http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/existEmail',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email: this.inputEmailRef.current.value,
        }),
      };

      console.log(this.onValidateEmail(e.target.value));
      // 2. DB에 email 존재하는 지 확인
      axios(config).then((response) => {
        // console.log(response.data);
        // email이 존재하지 않으면 등록되지 않은 경우, state변경, 결과 좋다는 표시(className 추가)
        if (!response.data.result) {
          // state update
          this.setState({
            isEmailCheck: true,
          });
        } else {
          // state변경, 경고 표시(className 추가)
          this.setState({
            isEmailCheck: false,
          });
        }
      });
    } else {
      // DB에 이미 이메일이 존재하는 경우
      this.setState({
        isEmailCheck: false,
      });
    }
  };

  // 2. 닉네임 길이 3이상 && 영어 or 숫자만 가능
  // [유효성 검증 함수]: 영어 또는 숫자만 가능
  onNickNameOnlyNumAndEng = (str) => {
    return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
  };

  // [유효성 검증 함수]: 닉네임 길이 3이상
  onNickNameCheckLen = (nickName) => {
    return nickName.length >= 3;
  };

  // 3. 닉네임 존재하는 지 check
  onExistNickNameCheck = (e) => {
    // console.log(this.onNickNameOnlyNumAndEng(this.inputNickNameRef.current.value));
    // console.log(this.onNickNameCheckLen(this.inputNickNameRef.current.value));

    // nickName length 3이상, only english and number
    if (
      this.onNickNameOnlyNumAndEng(this.inputNickNameRef.current.value) &&
      this.onNickNameCheckLen(this.inputNickNameRef.current.value)
    ) {
      // console.log('둘다 true');
      this.setState({
        isNickNameCheck: true,
      });
      // 닉네임 유효성 검사 2가지 모두 통과 시 DB에 이미 존재하는 nickName이 있는지 확인
      // axios
      //   .post(
      //     `http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/existNickName`,
      //     {
      //       nickname: this.inputNickNameRef.current.value,
      //     }
      //   )
      //   .then((response) => {
      //     // nickName이 없는 경우, state, className add
      //     if (response.data.result) {
      //       this.setState({
      //         isNickNameCheck: true,
      //       });
      //     } else {
      //       // nickName이 있는 경우, state, className add
      //       this.setState({
      //         isNickNameCheck: false,
      //       });
      //     }
      //   });
    } else {
      // className add
      this.setState({
        isNickNameCheck: false,
      });
    }
  };

  // 4. 비밀번호 정규표현식 확인 체크하기
  // [유효성 검증 함수]: 최소 5자 이상이면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
  onPasswordValidation = (pwd) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/.test(
      pwd
    );
  };

  onPasswordCheck = (e) => {
    if (this.onPasswordValidation(this.inputPwdRef.current.value)) {
      console.log('비밀번호 통과');
      this.setState({
        isPasswordCheck: true,
      });
    } else {
      console.log('비밀번호 미통과');
      this.setState({
        isPasswordCheck: false,
      });
    }
  };

  // 5. password confirm 부분에서 비밀번호 유효성
  onPasswordConfirm = (e) => {
    if (
      this.inputPwdRef.current.value === this.inputPwdConfirmRef.current.value
    ) {
      // console.log('비밀번화 둘다 같음');
      this.setState({
        isPasswordConfirm: true,
      });
    } else {
      // console.log('비밀번화 둘이 같지 않음');
      this.setState({
        isPasswordConfirm: false,
      });
    }
  };

  // 위의 state들이 다 true일 때만 axios날리기

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isLoading: true,
    });

    const email = this.inputEmailRef.current.value;
    const nickName = this.inputNickNameRef.current.value;
    const pwd = this.inputPwdRef.current.value;

    if (
      this.state.isEmailCheck &&
      this.state.isNickNameCheck &&
      this.state.isPasswordCheck &&
      this.state.isPasswordConfirm
    ) {
      const signUpResult = this.props.onSignUp({
        email: email,
        nickname: nickName,
        password: pwd,
      });

      if (signUpResult) {
        this.setState({
          isLoading: false,
        });
        this.props.history.push('/login');
      } else {
        this.setState({
          isLoading: false,
        });
      }
    }

    this.formRef.current.reset();
  };

  render() {
    return this.props.isLoading ? (
      <Loading />
    ) : (
      <div className='sign-up-container'>
        <div className='sign-up'>
          <h1 className='sign-up-title'>Sign Up</h1>
          <form
            ref={this.formRef}
            className='sign-up-form'
            onSubmit={this.onSubmit}
          >
            <div className='sign-up-input'>
              <label htmlFor='email'>Email</label>
              <input
                ref={this.inputEmailRef}
                id='email'
                type='text'
                onChange={this.onExistEmailCheck}
              />
            </div>
            <div className='sign-up-input'>
              <label htmlFor='ninkname'>Nick Name</label>
              <input
                ref={this.inputNickNameRef}
                id='ninkname'
                type='text'
                onChange={this.onExistNickNameCheck}
              />
              <p className='nickname-rule'>
                닉네임 길이는 3글자 이상, 영어 또는 숫자만 가능합니다 :)
              </p>
            </div>
            <div className='sign-up-input'>
              <label htmlFor='pwd'>Password</label>
              <input
                ref={this.inputPwdRef}
                id='pwd'
                type='password'
                onChange={this.onPasswordCheck}
              />
              <p className='pwd-rule'>
                5자 이상 / 알파벳 / 숫자 / 특수문자(@$!%*#?&)는 하나 이상
                포함해주세요 :)
              </p>
            </div>
            <div className='sign-up-input'>
              <label htmlFor='pwdConfirm'>Pwd Confirm</label>
              <input
                className='sign-up-input-tag'
                ref={this.inputPwdConfirmRef}
                id='pwdConfirm'
                type='password'
                onChange={this.onPasswordConfirm}
              />
            </div>
            <>
              <button className='sign-up-btn'>Sign Up</button>
            </>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
