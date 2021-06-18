import React,{useState} from 'react';
import { withRouter } from 'react-router-dom';
import quokka from '../../../Utils/images/quokka.jpg';
import env from 'react-dotenv'
import axios from 'axios';
import '../myList.css';

function List(props) {

  const handleListClick = (event) => {

    if (event.target.classList[0] !== 'playlist') {
      // 해당 리스트의 뮤직리스트 요청
      axios.post(`${env.REACT_APP_API_URL}/nod/getMusicList`, {
        myListId: props.playlist.id,
      }).then(response => {
        if(response.data.success) {
          // 뮤직리스트 app의 상태 업로드
          console.log(response.data.data)
          let result = response.data.data.map(music => {
            return {
              ...music,
              id: music.musicid,
              thumbnail: {url : music.thumbnail} 
            }
          })
          props.updateMyList(result);
          props.history.push('/mainPlayer');

        }
      })
      // 페이지 이동
    }
  };

  const [image1, image2, image3, image4] = props.playlist.thumbnails;
  return (
    <div>
      <div className='playlist' onClick={handleListClick}>
        <div className='playlist__image'>
          <img src={image1 ? image1 : quokka} alt='' />
          <img src={image2 ? image2 : quokka} alt='' />
          <img src={image3 ? image3 : quokka} alt='' />
          <img src={image4 ? image4 : quokka} alt='' />
        </div>
        <div className='playlist__detail'>
          <span className='playlist__title'>{props.playlist.listTitle}</span>
          <span className='playlist__date'>
            {new Date(props.playlist.createdAt).toJSON().slice(0, 10)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(List);
