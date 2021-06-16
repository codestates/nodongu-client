import React, { Component } from 'react';

class Song extends Component {
  render() {
    return (
      <li className="play-list-li">
        <div className="play-list-left">
          <img src={albumImage} className="play-list-song-img" alt="album" />
          <div className="play-list-content">
            <div className="play-list-content-title">Butter</div>
            <div className="play-list-content-singer"></div>
          </div>
        </div>
        <div className="play-list-right">
          <div className="play-replay-time">2:45</div>
        </div>
      </li>
    );
  }
}

export default Song;
