import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost, deletePost } from '../actions'

class PostsShow extends Component {
  componentDidMount() { 
    // if(!this.props.post)
      //fetch 
    this.props.fetchPost(this.props.match.params.id)
  }

  onDeleteClick(id) { 
    this.props.deletePost(this.props.match.params.id, () => this.props.history.push('/'))
  }

  render() {
    const { post } = this.props
    if(!post)
        return <div>Loading...</div>

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button 
          onClick={() => this.onDeleteClick()} 
          className="btn btn-danger pull-xs-right">Delete Post</button>
        <h3>{ post.title }</h3>
        <h6>Categories: { post.categories }</h6>
        <p>{ post.content }</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)