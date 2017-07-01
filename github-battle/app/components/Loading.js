import React, { Component } from 'react'
import PropTypes from 'prop-types'

let styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

export default class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text,
    }
  }

  componentDidMount() {
    const stopper = this.props.text + '...'

    
    this.interval = window.setInterval(() => {
      return stopper === this.state.text ? 
        this.setState({
          text: this.props.text
        }) : 
        this.setState({
          text: this.state.text + '.'
        })  
    }, this.props.speed)

  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <p style={styles.content}>{this.state.text}</p>
    )
  }
}

Loading.PropTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}