import React, { Component } from 'react';
import './editUserInfo.css';
import axios from 'axios';

class EditUserInfo extends Component {
  state = {
    fakeData: {
      userId: 1,
      nickname: 'quokka',
      email: 'wldns0622@naver.com',
      password: '124124124124',
      image: '',
    },
  };

  imageHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          fakeData: {
            ...this.state.fakeData,
            image: reader.result,
          },
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  handleDeleteImage = (event) => {
    this.setState({
      fakeData: {
        ...this.state.fakeData,
        image: `https://cdn.crowdpic.net/list-thumb/thumb_l_DA90FFC2106321ECE0F4F818C03CC01D.jpg`,
      },
    });
  };

  render() {
    const { image } = this.state.fakeData;
    return (
      <div className='edit-container'>
        <div className='edit-card'>
          <div className='edit-card__header'>
            <div className='header__picture'>
              <img
                src={
                  image
                    ? image
                    : `https://cdn.crowdpic.net/list-thumb/thumb_l_DA90FFC2106321ECE0F4F818C03CC01D.jpg`
                }
                alt='profile image'
              />
              <input
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
                {`${this.state.fakeData.nickname}님, 어서오세요!`}
                <input className='nickname__input hidden' type='text' />
              </h2>
              <div className='nickname__button-container'>
                <button className='nickname__button' type='button'>
                  수정
                </button>
                <button className='nickname__button hidden' type='button'>
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
                  <span>{this.state.fakeData.email}</span>
                </div>
                <hr />
              </li>
              <li className='info__password'>
                <div>
                  <h2>패스워드</h2>
                  <span className=''>
                    {this.state.fakeData.password
                      .split('')
                      .map((el) => '*')
                      .join('')}
                  </span>
                  <input
                    type='password'
                    className='info__password__input hidden'
                  />
                  <button type='button'>수정</button>
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
                <button type='button'>회원 탈퇴</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default EditUserInfo;
