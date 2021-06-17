import React, { Component } from 'react';

class PlayFrame extends Component {
  render() {
    return (
      <iframe
        style={{
          position: 'absolute',
          top: 2,
          left: -20,
          width: '300px',
          height: '28px',
          opacity: 1,
        }}
        src={`https://www.youtube.com/embed/${this.props.videoId}?autoplay=1&mute=0`}
        frameBorder="0"
      />
    );
  }
}

export default PlayFrame;
