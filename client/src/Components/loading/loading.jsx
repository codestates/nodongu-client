import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
  render() {
    return (
      <div className='loading-screen'>
        <div className='loading'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
}

export default Loading;
