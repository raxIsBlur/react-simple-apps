import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Battle from './Battle'
import Results from './Results'
import Popular from './Popular'
import Nav from './Nav'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />  
            { /*as in a switch statement this "pathless" Route acts as the default route*/ }
            <Route render={() => <p>Nothing found!</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}
