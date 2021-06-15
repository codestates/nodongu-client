import React, { Component, createRef } from 'react';
import axios from 'axios';
import './keyword.css';

axios.defaults.withCredentials = true;

class Keyword extends Component {
  handleClickKeyword = (event) => {
    const target = event.target;
    if (target.classList[0] === 'btn') {
      axios
        .post(`${process.env.REACT_APP_API_URL}/nod/music`, {
          keyword: target.textContent,
        })
        .then((response) => {
          // 수정 예정
          console.log(response.data);
        });
    }
  };

  handleKeywordClick = (event) => {
    if (event.target.classList[0] === 'keyword__btn') {
      //const keyword = event.target.textContent;
      const keyword = 'happy';
      console.log(keyword);
      let config = {
        method: 'post',
        url: 'http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com/nod/keywordMusic',
        data: {
          keyword,
        },
        withCredentials: true,
      };
      console.log('이제 요청 날림 ㅇㅋ?');
      axios(config).then((response) => console.log(response.data));
      console.log('요청완료됨 ㅇㅋ?');
    }
  };

  render() {
    return (
      <div className='keyword-container' onClick={this.handleKeywordClick}>
        <h1 className='keyword__title'>
          <span>Have you ever thought</span>
          <br />
          <span>about how you feel?</span>
        </h1>
        <section className='keyword__row'>
          <button className='keyword__btn keyword__btn1'>Exciting</button>
          <button className='keyword__btn keyword__btn2'>Gloomy</button>
          <button className='keyword__btn keyword__btn3'>Adorable</button>
          <button className='keyword__btn keyword__btn4'>Parting</button>
        </section>
        <section className='keyword__row'>
          <button className='keyword__btn keyword__btn1'>Sunny</button>
          <button className='keyword__btn keyword__btn2'>Cloudy</button>
          <button className='keyword__btn keyword__btn3'>Rainy</button>
          <button className='keyword__btn keyword__btn4'>Snowy</button>
        </section>
        <section className='keyword__row'>
          <button className='keyword__btn keyword__btn1'>Spring</button>
          <button className='keyword__btn keyword__btn2'>Summer</button>
          <button className='keyword__btn keyword__btn3'>Autumn</button>
          <button className='keyword__btn keyword__btn4'>Winter</button>
        </section>
      </div>
    );
  }
}

export default Keyword;
