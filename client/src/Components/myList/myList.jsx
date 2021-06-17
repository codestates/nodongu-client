import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './myList.css';
import List from './views/list';
import axios from 'axios';
import Loading from '../loading/loading';

class MyList extends Component {
  state = {
    isLoading: false,
    myList: [],
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios
      .post(
        `http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/getMyList`,
        { userId: this.props.userInfo.id }
      )
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
