import React from 'react'
import PropTypes from 'prop-types'

export function PlayerPreview(props) {
  return (
    <div>
      <div className="column">
        <img className="avatar" src={props.avatar} alt={'Avatar for ' + props.username} />
        <h2 className="header">@{props.username}</h2>
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}