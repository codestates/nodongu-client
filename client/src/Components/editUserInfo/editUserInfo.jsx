import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import './editUserInfo.css';
import axios from 'axios';
import quokkaImg from '../../Utils/images/quokka.jpg';
import Cookies from 'js-cookie';
import Loading from '../loading/loading';
import fs from 'fs';
import { Buffer } from 'buffer';
import env from 'react-dotenv';

axios.defaults.withCredentials = true;

class EditUserInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userInfo: {
        ...this.props.userInfo,
        password: '********',
      },
      isNickNameCheck: false,
      isPasswordCheck: false,
    };

    this.imageValueRef = React.createRef();
    this.nicknameRef = React.createRef();
    this.nicknameInput = React.createRef();
    this.nicknameButtonRef = React.createRef();
    this.nicknameEditButton = React.createRef();
  }

  componentDidMount() {
    axios
      .get(`${env.REACT_APP_API_URL}/nod/user/auth`, {
        headers: {
          authorization: Cookies.get('authorization'),
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.props.updateUserInfo(response.data.userInfo);
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          return this.props.history.push('/');
        }
      });
  }

  //1. 제가 auth 요청을 통해 토큰을 날려드립니다.
  //2. 해당 토큰을 디코드합니다.
  //3. 아이디를 비교 -> 정보를가져와야한다.
  //4. 응답으로 결과값 조회된 유저정보가

  // Image 업데이트 관련
  imageHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        axios
          .post(`${env.REACT_APP_API_URL}/nod/user/modImage`, {
            userId: this.props.userInfo.id,
            image: reader.result,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
              this.props.updateUserInfo({
                ...this.props.userInfo,
                image: reader.result,
                cd,
              });
            }
          });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  handleDeleteImage = (event) => {
    axios
      .post(`${env.REACT_APP_API_URL}/nod/user/modImage`, {
        userId: this.props.userInfo.id,
        image: '',
      })
      .then((response) => {
        if (response.data.success) {
          this.props.updateUserInfo({
            ...this.state.userInfo,
            image: '',
          });
        }
      });
  };

  // nickname 업데이트 관련
  onNickNameOnlyNumAndEng = (nickName) => {
    return /^[A-Za-z][A-Za-z0-9]*$/.test(nickName);
  };

  // [유효성 검증 함수]: 닉네임 길이 3이상
  onNickNameCheckLen = (nickName) => {
    return nickName.length >= 3;
  };

  // 3. 닉네임 존재하는 지 check
  onExistNickNameCheck = (e) => {
    if (
      this.onNickNameOnlyNumAndEng(e.target.value) &&
      this.onNickNameCheckLen(e.target.value)
    ) {
      this.setState({
        isNickNameCheck: true,
      });
      axios
        .post(`${env.REACT_APP_API_URL}/nod/user/existNickName`, {
          nickname: e.target.value,
        })
        .then((response) => {
          if (!response.data.result) {
            this.setState({
              isNickNameCheck: true,
            });
          } else {
            this.setState({
              isNickNameCheck: false,
            });
          }
        });
    } else {
      this.setState({
        isNickNameCheck: false,
      });
    }
  };

  // 닉네임 변경 요청
  handleEditNicknameChange = (event) => {
    if (this.state.isNickNameCheck) {
      axios
        .post(`${env.REACT_APP_API_URL}/nod/user/modNickname`, {
          userId: this.props.userInfo.id,
          nickname: this.nicknameInput.current.value,
        })
        .then((response) => {
          if (response.data.success) {
            // 업데이트가 성공 되었다면
            this.props.updateUserInfo({
              ...this.props.userInfo,
              nickname: this.nicknameInput.current.value,
            });
            this.setState({
              userInfo: {
                ...this.state.userInfo,
                nickname: this.nicknameInput.current.value,
              },
            });
            this.nicknameRef.current.classList.remove('hidden');
            this.nicknameInput.current.classList.add('hidden');
            this.nicknameButtonRef.current.classList.remove('hidden');
            this.nicknameEditButton.current.classList.add('hidden');
          }
        });
    }
  };

  // 닉네임 수정버튼 클릭시
  handleEditName = (event) => {
    // 기본 닉네임 span 숨기기
    this.nicknameRef.current.classList.add('hidden');
    // input 창 보이기
    this.nicknameInput.current.classList.remove('hidden');
    // 수정 버튼 숨기기
    event.target.classList.add('hidden');
    // 변경 버튼 보이기
    this.nicknameEditButton.current.classList.remove('hidden');
  };

  // 패스워드 유효성 검사
  onPasswordValidation = (pwd) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/.test(
      pwd
    );
  };

  onPasswordCheck = (e) => {
    if (this.onPasswordValidation(e.target.value)) {
      this.setState({
        isPasswordCheck: true,
      });
    } else {
      this.setState({
        isPasswordCheck: false,
      });
    }
  };

  // 비밀번호 변경 요청
  handleEditPasswordRequest = (event) => {
    const elList = event.target.parentElement.children;
    console.log(elList[2].value);
    if (this.state.isPasswordCheck) {
      axios
        .post(`${env.REACT_APP_API_URL}/nod/user/modPassword`, {
          userId: this.props.userInfo.id,
          password: elList[2].value,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            // 패스워드 텍스트 숨김
            elList[1].classList.remove('hidden');
            // 패스워드 인풋 활성
            elList[2].classList.add('hidden');
            // 수정 버튼 숨김
            elList[3].classList.remove('hidden');
            // 변경 버튼 활성
            elList[4].classList.add('hidden');
          }
        });
    }
  };

  // 패스워드 수정 버튼 클릭시
  handleEditPassword = (event) => {
    const elList = event.target.parentElement.children;
    // 패스워드 텍스트 숨김
    elList[1].classList.add('hidden');
    // 패스워드 인풋 활성
    elList[2].classList.remove('hidden');
    // 수정 버튼 숨김
    elList[3].classList.add('hidden');
    // 변경 버튼 활성
    elList[4].classList.remove('hidden');
  };

  // 회원 탈퇴 요청
  handleDeleteUser = (event) => {
    const config = {
      method: 'post',
      url: `${env.REACT_APP_API_URL}/nod/user/deleteUser`,
      data: {
        userId: this.props.userInfo.id,
      },
      withCredentials: true,
    };
    axios(config).then((response) => {
      if (response.data.success) {
        this.props.updateUserInfo({
          userInfo: {
            email: null,
            nickname: null,
            image: null,
          },
        });
        return this.props.history.push('/');
      }
    });
  };

  arrayBufferToBase643 = (data) => {
    const img = new Buffer.from(data).toString('ascii');
    return img;
  };

  render() {
    // const fileContents = new Buffer(this.props.userInfo.image.data, 'base64');
    // fs.writeFile('userImage', fileContents, (err) => {
    //   if (err) return console.error(err);
    //   console.log('file saved to ', 'userImage');
    // });
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className='edit-container'>
        <div className='edit-card'>
          <div className='edit-card__header'>
            <div className='header__picture'>
              <img
                src={
                  !this.props.userInfo.image
                    ? quokkaImg
                    : this.props.userInfo.image.data
                    ? this.arrayBufferToBase643(this.props.userInfo.image.data)
                    : this.props.userInfo.image
                }
                alt='profile'
              />
              <input
                ref={this.imageValueRef}
                type='file'
                name='image-upload'
                id='input'
                accept='image/*'
                onChange={this.imageHandler}
              />
              <label htmlFor='input' className='image-upload'>
                이미지 업로드
              </label>
              <button type='button' onClick={this.handleDeleteImage}>
                이미지 제거
              </button>
            </div>
            <div className='header__divided-line'></div>
            <div className='header__nickname'>
              <h2 className='nickname__nickname'>
                <span
                  ref={this.nicknameRef}
                >{`${this.props.userInfo.nickname}님, 어서오세요!`}</span>
                <input
                  ref={this.nicknameInput}
                  className='nickname__input hidden'
                  type='text'
                  placeholder='변경할 닉네임'
                  onChange={this.onExistNickNameCheck}
                />
              </h2>
              <div className='nickname__button-container'>
                <button
                  ref={this.nicknameButtonRef}
                  className='nickname__button nickname__button--edit'
                  type='button'
                  onClick={this.handleEditName}
                >
                  수정
                </button>
                <button
                  ref={this.nicknameEditButton}
                  className='nickname__button nickname__button--submit hidden'
                  type='button'
                  onClick={this.handleEditNicknameChange}
                >
                  변경
                </button>
              </div>
            </div>
          </div>
          <div className='edit-card__body'>
            <ul className='edit-card__info'>
              <li className='info__email'>
                <div>
                  <h2>이메일</h2>
                  <span>{this.props.userInfo.email}</span>
                </div>
                <hr />
              </li>
              <li className='info__password'>
                <div>
                  <h2>패스워드</h2>
                  <span className=''>
                    {this.state.userInfo.password
                      .split('')
                      .map((el) => '*')
                      .join('')}
                  </span>
                  <input
                    type='password'
                    className='info__password__input hidden'
                    placeholder='변경할 비밀번호'
                    onChange={this.onPasswordCheck}
                  />
                  <button type='button' onClick={this.handleEditPassword}>
                    수정
                  </button>
                  <button
                    className='hidden'
                    type='button'
                    onClick={this.handleEditPasswordRequest}
                  >
                    변경
                  </button>
                </div>
                <hr />
              </li>
              <li className='info__deleteUser'>
                <div>
                  <h2>회원 탈퇴</h2>
                </div>
                <button type='button' onClick={this.handleDeleteUser}>
                  회원 탈퇴
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(EditUserInfo);
