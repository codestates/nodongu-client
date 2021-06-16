import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../popup/popup';
import './navbar.css';
import logo from '../../Utils/images/logo_3.png';
import quokka from '../../Utils/images/quokka.jpg';

class Navbar extends Component {
  state = {
    fakeData: {
      userId: 1,
      nickname: 'jiye-7',
      email: 'jyhi@gmail.com',
      image: '',
    },
    isProfileClick: false,
  };

  profileRef = React.createRef();

  handleOpenPopup = (e) => {
    if (e.target.classList[1] === undefined) {
      e.target.classList.add('user-img-small');

      this.setState({
        isProfileClick: true,
      });
    }
  };

  handleClosePopup = (e) => {
    if (e.target.classList[1] || e.target.parentElement.classList) {
      this.profileRef.current.classList.remove('user-img-small');

      this.setState({
        isProfileClick: false,
      });
    }
  };

  render() {
    return (
      <div className='navigation-container'>
        <nav className='navigation-container-nav'>
          <ul className='nav__ul'>
            <li className='li_logo'>
              <img
                src={logo}
                style={({ width: 60 }, { height: 60 })}
                alt='logo'
              />
            </li>
            <li className='li_playlist'>
              <Link to='/keyword'>Play List</Link>
            </li>
            <li className='li_mylist'>
              <Link to='/myList'>My List</Link>
            </li>
          </ul>
          {
            !this.props.userData.id ? <Link to="/"><span className="Login-btn">Login</span></Link> : (
              <img
            ref={this.profileRef}
            className='user-img'
            src={
              !this.state.fakeData.image
                ? `${quokka}`
                : `${this.state.fakeData.image}`
            }
            alt='userProfile'
            onClick={
              this.state.isProfileClick
                ? this.handleClosePopup
                : this.handleOpenPopup
            }
          />
            )
          }
          <Popup
            profileClick={this.state.isProfileClick}
            onClosePopup={this.handleClosePopup}
            userData={this.props.userData}
            logoutUser={this.props.logoutUser}
          />
        </nav>
      </div>
    );
  }
}

export default Navbar;
