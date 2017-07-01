import React from 'react'
import PropTypes from 'prop-types'

import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

// stateless functional component
function SelectLanguage(props) {
  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='languages'>
      {
        languages.map(lg => <li 
        style={lg === props.selectedLanguage ? {color: 'red'} : null}
        onClick={() => props.onSelect(lg)}
        key={lg}>
          {lg}
        </li>)
      }
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

function RepoGrid(props) { 
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return <li className="popular-item" key={repo.name}>
          <div className="popular-rank">
            #{index+1}
          </div>
          <ul className="space-list-items">
            <li>
              <img 
                src={repo.owner.avatar_url} 
                alt={'Avatar for: ' + repo.owner.login} 
                className="avatar"/>
            </li>
            <li>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component { 
  constructor(props) { 
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    }
  }

  componentDidMount() { 
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lg) {
    this.setState({selectedLanguage: lg, repos: null})
    fetchPopularRepos(lg).then(repos => this.setState({repos}))
  }

  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={(val) => this.updateLanguage(val)}
        />
        {
          !this.state.repos ? <div><Loading text="Fetching" speed={100}/></div> : <RepoGrid repos={this.state.repos}/>
        }
      </div>
    )
  }
}