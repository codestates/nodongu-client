import React, { Component } from 'react';
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

  render() {
    return (
      <div className='keyword-container' onClick={this.handleClickKeyword}>
        <h1 className='keyword__title'>내가 이끌리는 느낌은?</h1>
        <section className='keyword__row'>
          <button className='keyword__btn keyword__btn1'>행복</button>
          <button className='keyword__btn keyword__btn2'>우울</button>
          <button className='keyword__btn keyword__btn3'>사랑</button>
          <button className='keyword__btn keyword__btn4'>이별</button>
        </section>
        <section className='keyword__row'>
          <button className='keyword__btn keyword__btn1'>맑음</button>
          <button className='keyword__btn keyword__btn2'>흐림</button>
          <button className='keyword__btn keyword__btn3'>비</button>
          <button className='keyword__btn keyword__btn4'>눈</button>
        </section>
        <section className='keyword__row'>
          <button className='keyword__btn keyword__btn1'>봄</button>
          <button className='keyword__btn keyword__btn2'>여름</button>
          <button className='keyword__btn keyword__btn3'>가을</button>
          <button className='keyword__btn keyword__btn4'>겨울</button>
        </section>
      </div>
    );
  }
}

export default Keyword;
