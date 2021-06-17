import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './myList.css';
import List from './views/list';
import axios from 'axios';
import Loading from '../loading/loading';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.withCredentials = true;

class MyList extends Component {
  constructor(props) {
    super(props);
    axios
      .get(`${process.env.REACT_APP_API_URL}/nod/user/auth`, {
        headers: {
          authorization: Cookies.get('authorization'),
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.props.updateUserInfo(response.data.userInfo);
        } else {
          return this.props.history.push('/');
        }
      });

    this.state = {
      isLoading: false,
      myList: [],
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios
      .post(`${process.env.REACT_APP_API_URL}/nod/getMyList`, {
        userId: this.props.userInfo.id,
      })
      .then((response) => {
        console.log(response.data.data);
        this.props.updateMyList(response.data.data);
        this.setState({
          myList: response.data.data,
        });
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className='mylist-container'>
        <h2> Single Item</h2>
        <Slider {...settings}>
          {this.props.myList[0] ? (
            this.props.myList.map((playlist) => (
              <List key={playlist.id} playlist={playlist} />
            ))
          ) : (
            <span>리스트가 없습니다</span>
          )}
        </Slider>
      </div>
    );
  }
}

export default withRouter(MyList);
