import React, { Component } from 'react';
import logo from '../../Utils/images/logo_3.png';

class Navbar extends Component {
  render() {
    return (
      <div className="navigation-container">
        <nav>
          <ul>
            <li>
              <img src={logo} style={({ width: 55 }, { height: 55 })} />
            </li>
            <li>PlayList</li>
            <li>My List</li>
          </ul>
          <img
            className="user-img"
            src={
              this.props.userInfo === null
                ? `https://cdn.crowdpic.net/list-thumb/thumb_l_DA90FFC2106321ECE0F4F818C03CC01D.jpg`
                : `${this.props.userInfo.image}`
            }
            style={({ width: 75 }, { height: 75 })}
          ></img>
        </nav>
      </div>
    );
  }
}

export default Navbar;
