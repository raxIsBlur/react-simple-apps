import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PostIndex from './PostIndex'
import PostsNew from './PostsNew'
import PostsShow from './PostsShow'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/posts/:id" component={PostsShow} />
            <Route path="/" component={PostIndex} />
          </Switch>
      </BrowserRouter>
    );
  }
}
