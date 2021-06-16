import React, { Component } from 'react';
import './mainPlayer.css';
import albumImage from '../../Utils/images/album-image.png';
import AddPlayer from '../addPlayer/addPlayer';

class MainPlayer extends Component {
  state = {
    isAddPlayerBtnClick: false,
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

  render() {
    return (
      <main className='main-player-container'>
        <div className='main-play'>
          <div className='play-img'>
            <img src={albumImage} className='play-album-img' alt='album' />
          </div>
          <div className='main-play-list'>
            <p className='next-track'>다음 트랙</p>
            <ul className='play-list-ul'>
              <li className='play-list-li'>
                <div className='play-list-left'>
                  {/* <div className="play-list-song"> */}
                  <img
                    src={albumImage}
                    className='play-list-song-img'
                    alt='album'
                  />
                  {/* </div> */}
                  <div className='play-list-content'>
                    <div className='play-list-content-title'>Butter</div>
                    <div className='play-list-content-singer'>
                      {/* 방탄소년단(BTS) */}
                    </div>
                  </div>
                </div>
                <div className='play-list-right'>
                  <div className='play-replay-time'>2:45</div>
                </div>
              </li>
              <li className='play-list-li'>
                <div className='play-list-left'>
                  <img
                    src={albumImage}
                    className='play-list-song-img'
                    alt='album'
                  />
                  <div className='play-list-content'>
                    <div className='play-list-content-title'>Butter</div>
                    <div className='play-list-content-singer'>
                      {/* 방탄소년단(BTS) */}
                    </div>
                  </div>
                </div>
                <div className='play-list-right'>
                  <div className='play-replay-time'>2:45</div>
                </div>
              </li>
              <li className='play-list-li'>
                <div className='play-list-left'>
                  <img
                    src={albumImage}
                    className='play-list-song-img'
                    alt='album'
                  />
                  <div className='play-list-content'>
                    <div className='play-list-content-title'>Butter</div>
                    <div className='play-list-content-singer'>
                      {/* 방탄소년단(BTS) */}
                    </div>
                  </div>
                </div>
                <div className='play-list-right'>
                  <div className='play-replay-time'>2:45</div>
                </div>
              </li>
              <li className='play-list-li'>
                <div className='play-list-left'>
                  <img
                    src={albumImage}
                    className='play-list-song-img'
                    alt='album'
                  />
                  <div className='play-list-content'>
                    <div className='play-list-content-title'>Butter</div>
                    <div className='play-list-content-singer'>
                      {/* 방탄소년단(BTS) */}
                    </div>
                  </div>
                </div>
                <div className='play-list-right'>
                  <div className='play-replay-time'>2:45</div>
                </div>
              </li>
              <li className='play-list-li'>
                <div className='play-list-left'>
                  <img
                    src={albumImage}
                    className='play-list-song-img'
                    alt='album'
                  />
                  <div className='play-list-content'>
                    <div className='play-list-content-title'>Butter</div>
                    <div className='play-list-content-singer'>
                      {/* 방탄소년단(BTS) */}
                    </div>
                  </div>
                </div>
                <div className='play-list-right'>
                  <div className='play-replay-time'>2:45</div>
                </div>
              </li>
              <li className='play-list-li'>
                <div className='play-list-left'>
                  <img
                    src={albumImage}
                    className='play-list-song-img'
                    alt='album'
                  />
                  <div className='play-list-content'>
                    <div className='play-list-content-title'>Butter</div>
                    <div className='play-list-content-singer'>
                      {/* 방탄소년단(BTS) */}
                    </div>
                  </div>
                </div>
                <div className='play-list-right'>
                  <div className='play-replay-time'>2:45</div>
                </div>
              </li>
              <li className='play-list-li'>
                <div className='play-list-left'>
                  <img
                    src={albumImage}
                    className='play-list-song-img'
                    alt='album'
                  />
                  <div className='play-list-content'>
                    <div className='play-list-content-title'>Butter</div>
                    <div className='play-list-content-singer'>
                      {/* 방탄소년단(BTS) */}
                    </div>
                  </div>
                </div>
                <div className='play-list-right'>
                  <div className='play-replay-time'>2:45</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="play-container">
          <div className="play-duration">
            <div className="play-duration-bar"></div>
          </div>
          <div className="play-set-up">
            <div className="play-range">
              <button className="pre-music-btn">
                <i className="fas fa-step-backward"></i>
              </button>
              <button className='pause-music-btn'>
                <i className='fas fa-pause'></i>
              </button>
              <button className='next-music-btn'>
                <i className='fas fa-step-forward'></i>
              </button>
              <span className='music-time'>2:34/3:37</span>
            </div>
            <div className='play-song-info'>
              <div className='play-song-info-content'>
                <img src={albumImage} className='song-info-img' alt='album' />
                <div className='song-info-content'>
                  <div className='song-info-title'>Butter</div>
                  <div className='song-info-singer'>
                    방탄소년단(BTS) • Butter(Hotter, Sweeter, Cooler) • 2021
                  </div>
                </div>
                <div className='song-add'>
                  <button
                    className='song-add-btn'
                    onClick={() => {
                      this.handleOpenModal();
                    }}
                  >
                    <i className='fas fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
            <div className='play-song-setting'>
              <button>
                <i className='fas fa-volume-up'></i>
              </button>
              <button>
                <i className='fas fa-redo'></i>
              </button>
              <button>
                <i className='fas fa-random'></i>
              </button>
            </div>
          </div>
        </div>

        <AddPlayer
          isAddBtnClick={this.state.isAddPlayerBtnClick}
          onCloseAddPlayer={this.handleCloseModal}
        />
        <div id='player'>{}</div>
      </main>
    );
  }
}

export default MainPlayer;
