import React, { Component } from 'react';
import axios from 'axios';
import './addPlayer.css';

class AddPlayer extends Component {
  state = {
    isNewAddMusicBtnClick: false,
  };

  newPlayListRef = React.createRef();
  popupCloseBtnRef = React.createRef();
  inputRef = React.createRef();

  handleAddList = (e) => {
    const myListId = e.target.id;
    const { id, title, thumbnail } = this.props.currentMusic;

    axios
      .post(
        'http://ec2-54-180-95-187.ap-northeast-2.compute.amazonaws.com/nod/addMusic',
        {
          myListId: myListId,
          videoId: id,
          title: title,
          thumbnail: thumbnail.url,
        }
      )
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  handleNewList = (e) => {
    if (e.target.className === 'new-play-add') {
      this.newPlayListRef.current.classList.toggle(
        'new-playlist-container-hidden'
      );
      this.setState({
        isNewAddMusicBtnClick: true,
      });
    }
  };

  handleAddMyList = () => {
    console.log('userId: ', this.props.userId); // 13
    console.log('inputVal: ', this.inputRef.current.value); //

    // addMyList
    axios
      .post(
        'http://ec2-54-180-95-187.ap-northeast-2.compute.amazonaws.com/nod/addMyList',
        {
          userId: this.props.userId,
          title: this.inputRef.current.value,
        }
      )
      .then((response) => {
        if (response.data.success) {
          // this.inputRef.current.reset();
          this.props.onCloseAddPlayer();
          console.log(response);
          this.setState({
            isNewAddMusicBtnClick: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

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
          <section className="add-player">
            <div className="add-player-title">
              <i className="fas fa-democrat"></i>
              <h2 className="player-title">My Play List에 추가</h2>
              <button
                ref={this.popupCloseBtnRef}
                className="close-btn"
                onClick={(e) => {
                  this.setState({
                    isNewAddMusicBtnClick: false,
                  });
                  this.props.onCloseAddPlayer();
                }}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <ul className="my-play-lists" onClick={this.handleAddList}>
              {this.props.myList.map((list) => {
                console.log(list);
                return (
                  <li id={list.id} key={list.id} className="my-music-list">
                    {list.listTitle}
                  </li>
                );
              })}
            </ul>
            <div className="new-my-play-list">
              <button className="new-play-list-btn">
                <i className="fas fa-plus" />
              </button>
              <p className="new-play-add" onClick={this.handleNewList}>
                새 재생목록 만들기
              </p>
            </div>
            <div
              ref={this.newPlayListRef}
              className="new-playlist-container new-playlist-container-hidden"
            >
              <label htmlFor="new-music-list">재생목록 : </label>
              <input
                ref={this.inputRef}
                type="text"
                name=""
                id="new-music-list"
                placeholder="새로운 플레이 리스트의 이름을 입력해주세요 :)"
                className="new-music-input"
              />
              <button className="new-mylist-btn" onClick={this.handleAddMyList}>
                <span>등록하기</span>
              </button>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default AddPlayer;
