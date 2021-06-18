import React, { Component } from 'react';

class Song extends Component {
  state = {
    isMusic: { ...this.props.music },
    durationTime: 0,
  };

  handleDurationConverter = (duration) => {
    // API시간 -->HH:MM:SS형태로 변환
    var hourRegex = new RegExp('[0-9]{1,2}H', 'gi');
    var minRegex = new RegExp('[0-9]{1,2}M', 'gi');
    var secRegex = new RegExp('[0-9]{1,2}S', 'gi');

    var hour = hourRegex.exec(duration);
    var min = minRegex.exec(duration);
    var sec = secRegex.exec(duration);

    if (hour !== null) {
      hour = hour.toString().split('H')[0] + ':';
    } else {
      hour = '';
    }
    if (min !== null) {
      min = min.toString().split('M')[0];
      if (min.length < 2) {
        min = '0' + min;
      }
    } else {
      min = '00';
    }
    if (sec !== null) {
      sec = sec.toString().split('S')[0];
      if (sec.length < 2) {
        sec = '0' + sec;
      }
    } else {
      sec = '00';
    }

    const convertTime = hour + min + ':' + sec;

    if (convertTime === '00:00') {
      this.setState({
        isMusic: { ...this.props.music, duration: 'Live' },
      });
    } else {
      this.setState({
        isMusic: { ...this.props.music, duration: convertTime },
      });
    }
  };

  componentDidMount = () => {
    this.handleDurationConverter(this.props.music.duration);
  };

  handleSelectMusic = (e) => {
    if (e.target.textContent === this.state.isMusic.title) {
      this.props.onChangeMusic(this.state.isMusic);
    }
  };

  render() {
    const { title } = this.props.music;
    const thumbnail = !this.props.music.thumbnail.url ? this.props.music.thumbnail
    : this.props.music.thumbnail.url
    

    return (
      <li className="play-list-li">
        <div className="play-list-left">
          <img src={thumbnail} className="play-list-song-img" alt="album" />
          <div className="play-list-content">
            <div
              className="play-list-content-title"
              onClick={this.handleSelectMusic}
            >
              {title}
            </div>
            <div className="play-list-content-singer"></div>
          </div>
        </div>
        <div className="play-list-right">
          <div className="play-replay-time">{this.state.isMusic.duration}</div>
        </div>
      </li>
    );
  }
}

export default Song;
