import React, { Component } from 'react';
import './editUserInfo.css';
import axios from 'axios';
import quokkaImg from '../../Utils/images/quokka.jpg';

class EditUserInfo extends Component {
  constructor(props) {
    super(props);

    this.imageValueRef = React.createRef();
    this.nicknameRef = React.createRef();
    this.nicknameInput = React.createRef();
    this.nicknameButtonRef = React.createRef();
    this.nicknameEditButton = React.createRef();

    this.state = {
      userInfo: {
        ...this.props.userInfo,
        password: '********',
      },
    };
  }

  imageHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader.result);
        this.setState({
          userInfo: {
            ...this.state.userInfo,
            image: reader.result,
          },
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  handleDeleteImage = (event) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        image: quokkaImg,
      },
    });
  };

  handleNicknameCheck = (event) => {
    console.log(this.nicknameInput.current.value);
    const config = {
      method: 'post',
      url: 'http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/existNickname',
      data: {
        nickname: this.nicknameInput.current.value,
      },
      withCredentials: true,
    };
    axios(config).then((response) => console.log(response.data));
  };

  // 닉네임 수정버튼 클릭시
  handleEditName = (event) => {
    // 기본 닉네임 span 숨기기
    this.nicknameRef.current.classList.add('hidden');
    // input 창 보이기
    this.nicknameInput.current.classList.remove('hidden');
    // 수정 버튼 숨기기
    console.log(event.target.classList.add('hidden'));
    // 변경 버튼 보이기
    this.nicknameEditButton.current.classList.remove('hidden');
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

  // 이미지 변경 요청
  // 닉네임 변경 요청
  // 비밀번호 변경 요청
  // 회원 탈퇴 요청
  handleDeleteUser = (event) => {
    console.log('들어옴 ㅇㅋ?');
    console.log(this.state.userInfo.userId);
    const config = {
      method: 'post',
      url: 'http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/user/deleteUser',
      data: {
        userId: 4,
      },
      withCredentials: true,
    };
    axios(config).then((response) => console.log(response));
  };

  render() {
    const { image } = this.state.userInfo;
    return (
      <div className='edit-container'>
        <div className='edit-card'>
          <div className='edit-card__header'>
            <div className='header__picture'>
              <img src={image ? image : quokkaImg} alt='profile' />
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
                >{`${this.state.userInfo.nickname}님, 어서오세요!`}</span>
                <input
                  ref={this.nicknameInput}
                  className='nickname__input hidden'
                  type='text'
                  placeholder='변경할 닉네임'
                  onChange={this.handleNicknameCheck}
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
                  onClick={this.handleEditNameReq}
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
                  <span>{this.state.userInfo.email}</span>
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
                  />
                  <button type='button' onClick={this.handleEditPassword}>
                    수정
                  </button>
                  <button className='hidden' type='button'>
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
export default EditUserInfo;