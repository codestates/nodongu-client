import React, { Component } from 'react';

class Song extends Component {
  state = {
    isMusic: { ...this.props.music },
  };

  render() {
    const { id, title, duration } = this.props.music;
    const thumbnail = this.props.music.thumbnail.url;

    return (
      <li className="play-list-li">
        <div className="play-list-left">
          <img src={thumbnail} className="play-list-song-img" alt="album" />
          <div className="play-list-content">
            <div className="play-list-content-title">{title}</div>
            <div className="play-list-content-singer"></div>
          </div>
        </div>
        <div className="play-list-right">
          <div className="play-replay-time">{duration}</div>
        </div>
      </li>
    );
  }
}

export default Song;
