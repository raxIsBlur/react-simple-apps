import { FETCH_WEATHER } from '../actions/index'

export default function(state = [], action) { 
  switch(action.type) {
    case FETCH_WEATHER: 
      // should manipulate the existing state but return a new array 
      // the point of a reducer is to return a new state 
      // return state.concat([action.payload.data])
      // shorthand to recreate a new array with the previous state values 
      return [ action.payload.data, ...state ]
  }

  return state
}