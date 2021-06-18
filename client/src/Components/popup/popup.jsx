import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './popup.css';
import quokkaImg from '../../Utils/images/quokka.jpg';
import axios from 'axios';
import dotenv from 'dotenv';
import Cookie from 'js-cookie';
dotenv.config();

axios.defaults.withCredentials = true;

class Popup extends Component {
  handleLogout = () => {
    Cookie.remove('authorization');
    this.props.history.push('/');
  };

  arrayBufferToBase643 = (data) => {
    const img = new Buffer.from(data).toString('ascii');
    return img;
  };

  render() {
    return (
      <section
        className={`popup-container ${
          this.props.profileClick ? '' : 'popup-hidden'
        }`}
        onClick={(e) => {
          if (e.target.classList[0] === 'userinfo-update-btn') {
            this.props.onClosePopup(e);
            this.props.history.push('/edituserinfo');
          } else if (e.target.classList[0] === 'user-logout-btn') {
            console.log(e.target.classList);
            this.props.onClosePopup(e);
          }
        }}
      >
        <div className='popup-profile'>
          <button
            className='popup-close-btn'
            onClick={(e) => {
              this.props.onClosePopup(e);
            }}
          >
            <i className='fas fa-times'></i>
          </button>
          <img
            className='popup-user-img'
            src={
              !this.props.userData.image
                ? quokkaImg
                : this.props.userData.image.data
                ? this.arrayBufferToBase643(this.props.userData.image.data)
                : this.props.userData.image
            }
            alt='userProfile'
          ></img>
          <h2 className='popup-profile-h2'>{this.props.userData.nickname}</h2>
          <h3 className='popup-profile-h3'>{this.props.userData.email}</h3>
        </div>

        <div className='popup-user-handling'>
          <button className='popup-user-update'>
            <i className='fas fa-user-cog' />
            <span className='userinfo-update-btn'>My Info Update</span>
          </button>
          <button className='popup-user-logout' onClick={this.handleLogout}>
            <i className='fas fa-sign-out-alt' />
            <span className='user-logout-btn'>Logout</span>
          </button>
        </div>
      </section>
    );
  }
}

export default withRouter(Popup);
