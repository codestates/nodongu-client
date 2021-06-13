import React, { Component } from 'react';
import './navbar.css';
import logo from '../../Utils/images/logo_3.png';
import quokka from '../../Utils/images/quokka.jpg';

class Navbar extends Component {
  render() {
    return (
      <div className="navigation-container">
        <nav className="navigation-container-nav">
          <ul className="nav__ul">
            <li className="li_logo">
              <img src={logo} style={({ width: 55 }, { height: 55 })} />
            </li>
            <li className="li_playlist">PlayList</li>
            <li className="li_mylist">My List</li>
          </ul>
          <img
            className="user-img"
            src={
              this.props.userInfo === null
                ? `${quokka}`
                : `${this.props.userInfo.image}`
            }
            style={({ width: 60 }, { height: 60 })}
          ></img>
        </nav>
      </div>
    );
  }
}

export default Navbar;
