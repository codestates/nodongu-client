import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './keyword.css';
import Loading from '../loading/loading';
import Cookies from 'js-cookie';
import env from 'react-dotenv';


axios.defaults.withCredentials = true;

class Keyword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios
      .get(`${env.REACT_APP_API_URL}/nod/user/auth`, {
        headers: {
          authorization: Cookies.get('authorization'),
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.props.updateUserInfo(response.data.userInfo);
          console.log(response.data.success);
          console.log(response.data.userInfo);
          this.setState({
            isLoading: false,
          });
        } else {
          return this.props.history.push('/');
        }
      });
  }

  handleKeywordClick = (event) => {
    if (event.target.classList[0] === 'keyword__btn') {
      this.setState({
        isLoading: true,
      });
      const keyword = event.target.textContent;
      let config = {
        method: 'post',
        url: `${env.REACT_APP_API_URL}/nod/keywordMusic`,
        data: {
          keyword,
        },
        withCredentials: true,
      };
      axios(config).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          this.props.updateMyList(response.data.data);
          this.setState({
            isLoading: false,
          });
          this.props.history.push('./mainPlayer');
        }
      });
    }
  };

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="keyword-container" onClick={this.handleKeywordClick}>
        <h1 className="keyword__title">
          <span>Have you ever thought</span>
          <br />
          <span>about how you feel?</span>
        </h1>
        <section className="keyword__row">
          <button className="keyword__btn keyword__btn1">Exciting</button>
          <button className="keyword__btn keyword__btn2">Gloomy</button>
          <button className="keyword__btn keyword__btn3">Adorable</button>
          <button className="keyword__btn keyword__btn4">Parting</button>
        </section>
        <section className="keyword__row">
          <button className="keyword__btn keyword__btn1">Sunny</button>
          <button className="keyword__btn keyword__btn2">Cloudy</button>
          <button className="keyword__btn keyword__btn3">Rainy</button>
          <button className="keyword__btn keyword__btn4">Snowy</button>
        </section>
        <section className="keyword__row">
          <button className="keyword__btn keyword__btn1">Spring</button>
          <button className="keyword__btn keyword__btn2">Summer</button>
          <button className="keyword__btn keyword__btn3">Autumn</button>
          <button className="keyword__btn keyword__btn4">Winter</button>
        </section>
      </div>
    );
  }
}

export default withRouter(Keyword);
