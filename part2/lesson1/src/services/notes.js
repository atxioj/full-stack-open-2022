import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

//OLD 
// const getAll = () => {
//   return axios.get(baseUrl) //directly returns with axious
// }

// const create = newObject => { //newObject is the argument we receive and use
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }
//NEW
const getAll = () => {
  const request = axios.get(baseUrl) //assigning promise directly to the variable request
  return request.then(response => response.data) //directly returns data from backend
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
// export default { 
//   getAll: getAll, //left is key of object, right is variables inside this module
//   create: create, 
//   update: update 
// }

//same name so can just simplify like this:
export default { getAll, create, update }