import React, { Component } from 'react';
import './popup.css';
import quokka from '../../Utils/images/quokka.jpg';

class Popup extends Component {
  state = {
    fakeData: {
      userId: 1,
      nickname: 'jiye-7',
      email: 'jy522hi@gmail.com',
      image: '',
    },
  };

  render() {
    return (
      <section
        className={`popup-container ${
          this.props.profileClick ? '' : 'popup-hidden'
        }`}
      >
        <div className="popup-profile">
          <img
            className="popup-user-img"
            src={
              this.state.fakeData.image == false
                ? `${quokka}`
                : `${this.state.fakeData.image}`
            }
          ></img>
          <h2 className="popup-profile-h2">{this.state.fakeData.nickname}</h2>
          <h3 className="popup-profile-h3">{this.state.fakeData.email}</h3>
        </div>

        <div className="popup-user-handling">
          <button className="popup-user-update">
            <i className="fas fa-user-cog" />
            <span>My Info Update</span>
          </button>
          <button className="popup-user-logout">
            <i className="fas fa-sign-out-alt" />
            <span>Logout</span>
          </button>
        </div>
      </section>
    );
  }
}

export default Popup;
