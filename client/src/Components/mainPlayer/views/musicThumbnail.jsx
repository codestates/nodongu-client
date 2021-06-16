import React, { Component } from 'react';

class MusicThumbnail extends Component {
  render() {
    // const thumbnailImage = this.props.thumbnailImage;

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
