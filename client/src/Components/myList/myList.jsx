import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import quokka from '../../Utils/images/quokka.jpg';
import './myList.css';
import List from './views/list';
import axios from 'axios';

const fakeData = [
  {
    id: 1,
    title: 'sampleList',
    date: '2021 - 06 - 12',
    thumbnails: [quokka, quokka, quokka, quokka],
  },
  {
    id: 2,
    title: 'sampleList2',
    date: '2021 - 06 - 12',
    thumbnails: [quokka, quokka, quokka, quokka],
  },
  {
    id: 3,
    title: 'sampleList3',
    date: '2021 - 06 - 12',
    thumbnails: [quokka, quokka, quokka],
  },
  {
    id: 4,
    title: 'sampleList4',
    date: '2021 - 06 - 12',
    thumbnails: [quokka, quokka],
  },
];

function MyList(props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if (!props.userInfo.userId) {
    //   return props.history.push('/');
    // }
    // const config = {
    //   method: 'post',
    //   url: 'http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/getMyList',
    //   withCredentials: true,
    //   data: {
    //     userId: props.userInfo.userId,
    //   },
    // };
    // axios(config).then((response) => console.log(response.data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='mylist-container'>
      <h2> Single Item</h2>
      <Slider {...settings}>
        {fakeData.map((playlist) => (
          <List key={playlist.id} playlist={playlist} />
        ))}
      </Slider>
    </div>
  );
}

export default withRouter(MyList);
