import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWeather } from '../actions/index'

class SearchBar extends Component {
  constructor(props) { 
    super(props)

    this.state = {
      term: ''
    }

    // this is to bind 'this' onto the function if you're not using the ES6 way by () => {}
    // this.onInputChange = this.onInputChange.bind(this)
    // this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange(event) {
    this.setState({ term: event.target.value })
  }

  onFormSubmit(event) {
    event.preventDefault()

    this.props.fetchWeather(this.state.term)
    this.setState({term: ''})
  }

  render() {
    return (
      <form onSubmit={(e) => this.onFormSubmit(e)} className="input-group">
        <input 
          className="form-control"
          type="text" 
          placeholder="Get a five day forecast in your selected cities"
          value={this.state.term} 
          onChange={(e) => this.onInputChange(e)}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary"> Submit</button>
        </span>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch)
}

// first one is mapStateToProps to connect the Redux State into the component
// instead this maps the action to the component 
export default connect(null, mapDispatchToProps)(SearchBar)