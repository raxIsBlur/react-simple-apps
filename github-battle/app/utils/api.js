import axios from 'axios'

let ghId = 'GH_CLIENT_ID'
let ghSecretKey = 'GH_SECRET_KEY'
// let authParams = `?client_id=${ghId}&client_secret=${ghSecretKey}`

const ghBaseUrl = 'https://api.github.com/users/'

function getProfile(username) {

  return axios.get(ghBaseUrl + username).then((user) => user.data)
}

function getRepos(username) {
  return axios.get(ghBaseUrl + username + '/repos?per_page=100')
}

function getStarCount(repos) {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count
  }, 0)
}

function calculateScore(profile, repos) {
  let followers = profile.followers
  let totalStars = getStarCount(repos)

  return (followers * 3) + totalStars
}

/* eslint-disable no-console */
function handleError(error) {
  console.warn('Error: ', error)
}
/* eslint-enable no-console */

function getUserData(player) {
  console.log("Player", player)
  return axios.all([getProfile(player), getRepos(player)]).then((data) => {
    let profile = data[0]
    let repos = data[1]

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers(players) {
  console.log("Players", players)
  return players.sort((a,b) => {
    return b.score - a.score
  })
}

function battle(players) {
  return axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
}

function fetchPopularRepos(language) {
  let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories')

  return axios.get(encodedURI).then((response) => response.data.items)
}

export { fetchPopularRepos, battle }
