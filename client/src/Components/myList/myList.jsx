import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
// import quokka from '../../Utils/images/quokka.jpg';
import './myList.css';
import List from './views/list';
import axios from 'axios';
import Loading from '../loading/loading';

function MyList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [myList, setMyList] = useState([]);
  const [userInfo, setUserInfo] = useState(props.userInfo);

  useEffect(() => {
    if (!userInfo.id) {
      return props.history.push('/');
    }
    setIsLoading(true);
    console.log('myList 요청 전');
    const config = {
      method: 'post',
      url: '/nod/getMyList',
      withCredentials: true,
      data: {
        userId: props.userInfo.id,
      },
    };
    console.log('세팅완료');
    axios(config).then((response) => {
      console.log(response.data.data);
      props.updateMyList(response.data.data);
      setMyList(response.data.data);
      setIsLoading(false);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div className='mylist-container'>
      <h2> Single Item</h2>
      <Slider {...settings}>
        {myList.map((playlist) => (
          <List key={playlist.id} playlist={playlist} />
        ))}
      </Slider>
    </div>
  );
}

export default withRouter(MyList);
