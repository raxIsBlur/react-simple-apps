import React, { Component } from 'react';
import PropTypes from 'prop-types'

import VideoListItem from './VideoListItem'

const VideoList = (props) => {
  const videoItems = props.videos.map((video, i) => 
    <VideoListItem 
      key={video.etag} 
      video={video} 
      onVideoSelect={props.onVideoSelect} /> )

  return (
    <ul className="col-md-4 list-group">
      { videoItems }
    </ul>
  )
}

VideoList.propTypes = {
  videos: PropTypes.array.isRequired,
  onVideoSelect: PropTypes.func.isRequired,
}

export default VideoList