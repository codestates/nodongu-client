import React, { Component } from 'react';
import './mainPlayer.css';
import albumImage from '../../Utils/images/album-image.png';
import AddPlayer from '../addPlayer/addPlayer';
import Song from './views/song';
import MusicThumbnail from './views/musicThumbnail';

// let frm = frames['frame'].document;
// let otherhead = frm.getElementsByTagName('head')[0];
// let link = frm.createElement('link');
// link.setAttribute('rel', 'stylesheet');
// link.setAttribute('type', 'text/css');
// link.setAttribute('className', 'iframe-player');
// console.log(link.getAttribute);
// link.setAttribute('href', './mainPlayer.css');
// otherhead.appendChild(link);

// let cssLink = document.createElement('link');
// cssLink.href = 'style.css';
// cssLink.rel = 'stylesheet';
// cssLink.type = 'text/css';
// frames['iframe1'].document.head.appendChild(cssLink);

class MainPlayer extends Component {
  state = {
    isAddPlayerBtnClick: false,
    musicList: [...this.props.musicList],
    currentMusic: {},
  };

  handleOpenModal = () => {
    this.setState({
      isAddPlayerBtnClick: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isAddPlayerBtnClick: false,
    });
  };

  handleMusicSwitch = (e) => {
    console.log('click');
    console.log(e.target);
  };

  render() {
    console.log(this.props.musicList);
    return (
      <main className="main-player-container">
        <div className="main-play">
          <div className="play-img">
            {/* {this.state.musicList.map((musicList) => {
              // console.log(musicList.thumbnail.url);
              return (
                <MusicThumbnail
                  key={musicList.id}
                  thumbnailImage={musicList.thumbnail.url}
                />
              );
            })} */}
            <img src={albumImage} className="play-album-img" alt="album" />
          </div>
          <div className="main-play-list">
            <p className="next-track">다음 트랙</p>
            <ul className="play-list-ul">
              {this.state.musicList.map((musicList) => {
                return <Song key={musicList.id} music={musicList} />;
              })}
            </ul>
          </div>
        </div>
        <div className="play-container">
          <div className="play-duration">
            <div className="play-duration-bar">--</div>
          </div>
          {/* <div className="player-container" onClick={this.handleMusicSwitch}>
            <iframe
              style={{
                position: 'relative',
                top: 55,
                left: 42,
                width: '300px',
                height: '30px',
                opacity: 0.3,
              }}
              src={`https://www.youtube.com/embed/ih-vI0LvbZI?autoplay=1&mute=0`}
              frameBorder="0"
              className="iframe-player"
            />
          </div> */}
          <div className="play-set-up">
            <div className="play-range">
              <div className="play-range-btn">
                <button className="pre-music-btn">
                  <i className="fas fa-step-backward"></i>
                </button>
                <button className="pause-music-btn">
                  <i className="fas fa-pause"></i>
                </button>
                <button className="next-music-btn">
                  <i className="fas fa-step-forward"></i>
                </button>
                <span className="music-time">2:34/3:37</span>
              </div>
              <div
                className="play-range-frame"
                onClick={this.handleMusicSwitch}
              >
                <iframe
                  id="iframe"
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: 53,
                    width: '300px',
                    height: '30px',
                    opacity: 0.3,
                  }}
                  src={`https://www.youtube.com/embed/ih-vI0LvbZI?autoplay=1&mute=0`}
                  frameBorder="0"
                  className="iframe-player"
                />
              </div>
            </div>
            <div className="play-song-info">
              <div className="play-song-info-content">
                <img src={albumImage} className="song-info-img" alt="album" />
                <div className="song-info-content">
                  <div className="song-info-title">Butter</div>
                  <div className="song-info-singer">
                    방탄소년단(BTS) • Butter(Hotter, Sweeter, Cooler) • 2021
                  </div>
                </div>
                <div className="song-add">
                  <button
                    className="song-add-btn"
                    onClick={() => {
                      this.handleOpenModal();
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="play-song-setting">
              <button>
                <i className="fas fa-volume-up"></i>
              </button>
              <button>
                <i className="fas fa-redo"></i>
              </button>
              <button>
                <i className="fas fa-random"></i>
              </button>
            </div>
          </div>
        </div>

        <AddPlayer
          isAddBtnClick={this.state.isAddPlayerBtnClick}
          onCloseAddPlayer={this.handleCloseModal}
        />
      </main>
    );
  }
}

export default MainPlayer;
