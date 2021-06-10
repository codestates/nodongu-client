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
      <div className='container' onClick={this.handleClickKeyword}>
        <h1 className='title'>내가 이끌리는 느낌은?</h1>
        <section className='row'>
          <button className='btn btn1'>행복</button>
          <button className='btn btn2'>우울</button>
          <button className='btn btn3'>사랑</button>
          <button className='btn btn4'>이별</button>
        </section>
        <section className='row'>
          <button className='btn btn1'>맑음</button>
          <button className='btn btn2'>흐림</button>
          <button className='btn btn3'>비</button>
          <button className='btn btn4'>눈</button>
        </section>
        <section className='row'>
          <button className='btn btn1'>봄</button>
          <button className='btn btn2'>여름</button>
          <button className='btn btn3'>가을</button>
          <button className='btn btn4'>겨울</button>
        </section>
      </div>
    );
  }
}

export default Keyword;
