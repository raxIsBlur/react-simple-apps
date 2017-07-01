import axios from 'axios'

export const FETCH_POST = "FETCH_POST"
export const FETCH_POSTS = "FETCH_POSTS"
export const CREATE_POST = "CREATE_POST"
export const DELETE_POST = "DELETE_POST"

const _rootURL = 'https://reduxblog.herokuapp.com/api'
const _blogKey = '?key=srax0110'

export function fetchPost(id) {
  const request = axios.get(`${_rootURL}/posts/${id}${_blogKey}`)

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function fetchPosts() {
  const request = axios.get(`${_rootURL}/posts${_blogKey}`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost(values, callback) {
  const request = axios.post(`${_rootURL}/posts${_blogKey}`, values).then(() => callback())

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${_rootURL}/posts/${id}${_blogKey}`).then(() => callback())
  return {
    type: DELETE_POST,
    payload: id
  } 
}