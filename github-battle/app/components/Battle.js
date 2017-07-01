import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { PlayerPreview } from './PlayerPreview.js'

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }
  }

  handleChange(ev) {
    let value = ev.target.value

    this.setState({username: value})
  }

  handleSubmit(ev) {
    ev.preventDefault()
    
    this.props.onSubmit(this.props.id, this.state.username)
  }

  render() {
    return (
      <form className="column" onSubmit={(ev) => this.handleSubmit(ev)}>
        <label htmlFor="username" className="header">{this.props.label}</label>
        <input 
          id='username'
          placeholder='github username'
          type='text' 
          autoComplete='off' 
          value={this.state.username}
          onChange={(ev) => this.handleChange(ev)} />
        <button 
          className='button'
          type='submit'
          disabled={!this.state.username}
        >Submit</button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  username: 'Username'
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      p1Name: '',
      p1Image: null,
      p2Name: '',
      p2Image: null,
    }
  }

  handleSubmit(id, username) {
    let newState = {}
    newState[id + 'Name'] = username
    newState[id + 'Image'] = `https://github.com/${username}.png?size=200`

    this.setState(newState)
  }

  handleReset(playerId) {
    let newState = {}

    newState[playerId + 'Name'] = ''
    newState[playerId + 'Image'] = null

    this.setState(newState)
  }

  render() {
    let match = this.props.match
    let p1Name = this.state.p1Name
    let p1Image = this.state.p1Image
    let p2Name = this.state.p2Name
    let p2Image = this.state.p2Image


    return (
      <div>
        <div className="row">
          {
            !p1Name && <PlayerInput id='p1' label={p1Name} onSubmit={(id, username) => this.handleSubmit(id, username)}/>
          }
          {
            p1Image && <PlayerPreview 
              avatar={p1Image}
              username={p1Name}
              id='p1'
            >
              <button className="reset" onClick={() => this.handleReset('p1')}>Reset</button>
            </PlayerPreview>
          }
          {
            !p2Name && <PlayerInput id='p2' label={p2Name} onSubmit={(id, username) => this.handleSubmit(id, username)}/>
          }
          {
            p2Image && <PlayerPreview 
              avatar={p2Image}
              username={p2Name}
              id='p2'
            >
              <button className="reset" onClick={() => this.handleReset('p2')}>Reset</button>
            </PlayerPreview>

          }

        </div>
        {
          p1Image && p2Image && <Link className="button" to={{
            pathname: match.url + '/results', 
            search: '?p1Name=' + p1Name + '&p2Name=' + p2Name
          }}>Battle</Link>
        }
      </div>
    )
  }
}

