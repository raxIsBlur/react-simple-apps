import axios from 'axios'

const OWM_APIKEY = '0eb8b5ed0769c9cf430a5dd48af27b1e'
const rootURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${OWM_APIKEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER'

export function fetchWeather(city) { 
  const url = `${rootURL}&q=${city},my`
  const request = axios.get(url)

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}