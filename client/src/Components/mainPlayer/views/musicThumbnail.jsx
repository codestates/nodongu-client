import React, { Component } from 'react';

class MusicThumbnail extends Component {
  render() {
    return (
      <img
        src={this.props.thumbnailImage}
        className="play-album-img"
        alt="album"
      />
    );
  }
}

export default MusicThumbnail;
