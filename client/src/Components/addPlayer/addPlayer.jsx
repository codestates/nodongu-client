import React, { Component } from 'react';
import './addPlayer.css';

class AddPlayer extends Component {
  render() {
    return (
      <>
        <div
          className={`add-modal-background ${
            this.props.isAddBtnClick ? '' : 'add-modal-background-hidden'
          }`}
        ></div>
        <div
          className={`add-player-container ${
            this.props.isAddBtnClick ? '' : 'add-playlist-popup-hidden'
          }`}
        >
          <section className='add-player'>
            <div className='add-player-title'>
              <i className='fas fa-democrat'></i>
              <h2 className='player-title'>My Play List에 추가</h2>
              <button
                className='close-btn'
                onClick={(e) => {
                  console.log(e.target);
                  this.props.onCloseAddPlayer();
                }}
              >
                <i className='fas fa-times' />
              </button>
            </div>

            <ul className='my-play-lists'>
              <li className='my-play-list'>
                <div className='list-title'>JY's Play List</div>
              </li>
              <li className='my-play-list'>
                <div className='list-title'>Quokka's Play List</div>
              </li>
              <li className='my-play-list'>
                <div className='list-title'>Hoho's Play List</div>
              </li>
              <li className='my-play-list'>
                <div className='list-title'>Quokka's Play List</div>
              </li>
              <li className='my-play-list'>
                <div className='list-title'>Hoho's Play List</div>
              </li>
              <li className='my-play-list'>
                <div className='list-title'>Quokka's Play List</div>
              </li>
              <li className='my-play-list'>
                <div className='list-title'>Hoho's Play List</div>
              </li>
              <li className='my-play-list'>
                <div className='list-title'>Quokka's Play List</div>
              </li>
              <li className='my-play-list'>
                <div className='list-title'>Hoho's Play List</div>
              </li>
            </ul>
            <div className='new-my-play-list'>
              <button className='new-play-list-btn'>
                <i className='fas fa-plus' />
              </button>
              <p className='new-play-add'>새 재생목록</p>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default AddPlayer;
