import React, { Component } from 'react';
import './mainPlayer.css';
import albumImage from '../../Utils/images/album-image.png';
import AddPlayer from '../addPlayer/addPlayer';
import Song from './views/song';
import MusicThumbnail from './views/musicThumbnail';

class MainPlayer extends Component {
  state = {
    isAddPlayerBtnClick: false,
    musicList: [...this.props.musicList],
    currentMusic: {},
  };

  handleChangeMusic = (currentMusic) => {
    this.setState({
      currentMusic,
    });
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
    return (
      <main className="main-player-container">
        <div className="main-play">
          <div className="play-img">
            <MusicThumbnail
              thumbnailImage={
                this.state.currentMusic.id
                  ? this.state.currentMusic.thumbnail.url
                  : this.state.musicList[0].thumbnail.url
              }
            />
          </div>
          <div className="main-play-list">
            <p className="next-track">다음 트랙</p>
            <ul className="play-list-ul">
              {this.state.musicList.map((musicList) => {
                return (
                  <Song
                    key={musicList.id}
                    music={musicList}
                    onChangeMusic={this.handleChangeMusic}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        <div className="play-container">
          <div className="play-duration">
            <div className="play-duration-bar"></div>
          </div>
          <div className="play-set-up">
            <div className="play-range">
              <div
                className="play-range-btn play-range-frame"
                onClick={this.handleMusicSwitch}
              >
                <iframe
                  id="iframe"
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: -20,
                    width: '300px',
                    height: '28px',
                    opacity: 1,
                  }}
                  src={`https://www.youtube.com/embed/ih-vI0LvbZI?autoplay=1&mute=0`}
                  frameBorder="0"
                  className="iframe-player"
                />
                <div className="iframe-player-hidden"></div>
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
