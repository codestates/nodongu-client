import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

  handleProfileClick = (e) => {
    if (e.target.classList[1] === undefined) {
      e.target.classList.add('user-img-small');
      this.setState({
        isProfileClick: true,
      });
    } else {
      e.target.classList.remove('user-img-small');
      this.setState({
        isProfileClick: false,
      });
    }
  };

  render() {
    return (
      <div className="navigation-container">
        <nav className="navigation-container-nav">
          <ul className="nav__ul">
            <li className="li_logo">
              <img src={logo} style={({ width: 60 }, { height: 60 })} />
            </li>
            <li className="li_playlist">PlayList</li>
            <li className="li_mylist">My List</li>
          </ul>
          <img
            ref={this.profileRef}
            className="user-img"
            src={
              this.state.fakeData.image == false
                ? `${quokka}`
                : `${this.state.fakeData.image}`
            }
            onClick={this.handleProfileClick}
          />
          <Popup profileClick={this.state.isProfileClick} />
        </nav>
      </div>
    );
  }
}

export default Navbar;
