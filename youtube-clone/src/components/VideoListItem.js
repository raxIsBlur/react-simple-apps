import React from 'react'
import PropTypes from 'prop-types'

const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = video.snippet.thumbnails.default.url  
  return (
    <li className="list-group-item" onClick={() => onVideoSelect(video)}>
      <div className="video-list media">
        <div className="media-left">
          <img src="" alt="" className="media-object" src={imageUrl} />
        </div>
        <div className="media-body">
          <div className="media-heading">{video.snippet.title}</div>
        </div>
      </div>
    </li>
  )
}

VideoListItem.propTypes = {
  video: PropTypes.any.isRequired,
  onVideoSelect: PropTypes.func.isRequired
}

export default VideoListItem