import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import './mainPlayer.css';
import AddPlayer from '../addPlayer/addPlayer';
import Song from './views/song';
import MusicThumbnail from './views/musicThumbnail';
import PlayFrame from './views/playFrame';
import Cookies from 'js-cookie';
import env from 'react-dotenv';
import Loading from '../loading/loading'
import Quakka from '../../Utils/images/quokka.jpg'

class MainPlayer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.musicList);

  }
  state = {
    isLoading: false,
    isAddPlayerBtnClick: false,
    musicList: [...this.props.musicList],
    currentMusic: {},
    myList: [],
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    })

    axios
      .get(`${env.REACT_APP_API_URL}/nod/user/auth`, {
        headers: {
          authorization: Cookies.get('authorization'),
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.props.updateUserInfo(response.data.userInfo);
          this.setState({
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          return this.props.history.push('/');
        }
      });
  }

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

  handleMyListRequest = async () => {
    // post myList
    let response = await axios.post(
      `${env.REACT_APP_API_URL}/nod/getMyList`,
      {
        userId: this.props.userId,
      }
    );
    if(response.data.data){
      this.setState({
        myList: [...response.data.data],
      });
    }
    
  };

  render() {
    return this.state.isLoading ? <Loading /> :
    (
      <main className="main-player-container">
        <div className="main-play">
          <div className="play-img">
            <MusicThumbnail
              thumbnailImage={
                this.state.currentMusic.id ? 
                  this.state.currentMusic.thumbnail.url
                  : (this.state.musicList[0] ? this.state.musicList[0].thumbnail.url
                  : Quakka)
                }
              
            />
          </div>
          <div className="main-play-list">
            <p className="next-track">다음 트랙</p>
            <ul className="play-list-ul">
              {this.state.musicList[0] ? 
              this.state.musicList.map((musicList) => {
                return (
                  <Song
                    key={musicList.id}
                    music={musicList}
                    onChangeMusic={this.handleChangeMusic}
                  />
                )
              }) : ''}
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
                <PlayFrame
                  videoId={
                    this.state.currentMusic.id
                      ? this.state.currentMusic.id
                      : this.state.musicList[0] ? this.state.musicList[0].id
                      : '5UJ5XKi394U'
                  }
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
                <span className="music-time">
                  {this.state.currentMusic.duration}
                </span>
              </div>
            </div>
            <div className="play-song-info">
              <div className="play-song-info-content">
                <img
                  src={
                    this.state.currentMusic.id ? 
                  this.state.currentMusic.thumbnail.url
                  : this.state.musicList[0] ? this.state.musicList[0].thumbnail.url
                  : Quakka
                  }
                  className="song-info-img"
                  alt="album"
                />
                <div className="song-info-content">
                  <div className="song-info-singer">
                    {this.state.currentMusic.title
                      ? this.state.currentMusic.title
                      : this.state.musicList[0] ? this.state.musicList[0].title
                    : `현재 선택된 곡이 없습니다 :(`}
                  </div>
                </div>
                <div className="song-add">
                  <button
                    className="song-add-btn"
                    onClick={async () => {
                      await this.handleMyListRequest();
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
          myList={this.state.myList}
          currentMusic={this.state.currentMusic}
          userId={this.props.userId}
        />
      </main>
    );
  }
}

export default withRouter(MainPlayer);