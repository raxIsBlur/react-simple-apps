import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash'

import { createPost } from '../actions'

const _fields = {
  title: {
    type: "input",
    label: "Post Title"
  },
  categories: {
    type: "input",
    label: "Categories",
  },
  content: {
    type: "textarea",
    label: "Post Content",
  }
}

class PostsNew extends Component {
  renderField(field, fieldConfig) { 
    const { meta: { touched, error} } = field
    const className=`form-group ${touched && error ? 'has-danger' : ''}`

    /*
    JSX tags required capitalized form if you want to include it
    If its an object the above constraint isn't applied 
    Example:
    
      const fieldType = fieldConfig.type
      ...<fieldType... is not valid

      const FieldType = fieldConfig.type
      ...<FieldType... is valid - FieldType here will resolve to input/textarea 

      <fieldConfig.type... is valid - fieldConfig.type here will resolve to input/textarea 
    */
    
    return (
      <div className={className}>
        <label>{field.label}</label>
        <fieldConfig.type 
          className="form-control"
          {...field.input}
          type="text"
        />
        <div className="text-help">
          {touched ? error : '' }
        </div>
      </div>
    )
  }

  onSubmit(values) { 
    this.props.createPost(
      values, 
      () => this.props.history.push('/')
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        
        {
          _.map(_fields, (fieldConfig, key) => {
            return <Field 
              key={key}
              label={fieldConfig.label}
              name={key}
              component={(field) => this.renderField(field, fieldConfig)}
            />
          })
        }

      
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
        
      </form>
    );
  }
}

function validate(values) {
  const errors = {}
  
  // Validate the inputs
  // if(!values.title)
  //     errors.title = "Enter a title"

  // if(!values.categories)
  //     errors.categories = "Enter some categories"

  // if(!values.content)
  //     errors.content = "Enter some content please"

    _.each(_fields, (type, field) => {
      if(!values[field])
        errors[field] = `Fill in the ${field}`
    })

  // if errors obj is empty the form is fine to submit 
  // if errors has any propertiess, redux form assumes form is invalid
  return errors
}

export default reduxForm({ 
  validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew))