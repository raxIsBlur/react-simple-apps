import React from 'react'
import YTSearch from 'youtube-api-search'
import _ from 'lodash'

import SearchBar from './SearchBar'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'

import { YT_APIKEY } from '../config/config'

export default class App extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      selectedVideo: null,
      videos: [],
    }

    this.videoSearch('surfboards')
  }

  videoSearch(term) {
    YTSearch({ 
      key: YT_APIKEY, 
      term: term 
    }, videos => this.setState({ 
      videos,
      selectedVideo: videos[0] }))
  }

  render() {
    const videoSearch = _.debounce(term => this.videoSearch(term), 500)

    return(
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          videos={this.state.videos} 
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })} />
      </div>
    )
  }
}