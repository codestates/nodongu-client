import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="navigation-container">
        <nav>
          <ul>
            <li>PlayList</li>
            <li>My List</li>
            <li>
              <img
                className="user-img"
                src={
                  this.props.userInfo
                    ? `https://blogfiles.pstatic.net/MjAxNzA1MjNfMTA1/MDAxNDk1NTQxMjY2ODY0.0pCWaDaIhTLs3TlZAgnx73ossilphBYxgzAWnc577bgg.-bEfv7csnuZUGtq5-NmplDjYYXEWvzWNdvklQE9sE8Qg.PNG.yej1686/Untitled-1-01.png`
                    : ``
                }
              ></img>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
