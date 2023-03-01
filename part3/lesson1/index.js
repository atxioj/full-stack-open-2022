//The primary purpose of the backend server in this course is to offer raw data in JSON format to the frontend.

const express = require('express') //func used to create exp app
const app = express() //express app stored in app variable
const cors = require('cors')
app.use(cors())
// const http = require('http')
const requestLogger = (request, response, next) => { // middleware func
  console.log('Method:', request.method) //these give info about the requests in the console
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next() //yields control to next middleware
}
const unknownEndpoint = (request, response) => { //to handle requests made to non existent routes
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json()) //json parser, needed for body, without it the body prop would be undefined, transforms JSON data to turn into a JS object for the body prop
app.use(requestLogger) //goes after json parser otherwise request.body will not be initialized 
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  const generateId = () => { //separate function for creating new id for a new note
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id)) //creates new arr with ids. The array can be turned into individual numbers by using ... syntax
      : 0                                 //cont: cause an array can't be directly passed to Math.max
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) { //if no value in content property, server will return 400 error
      return response.status(400).json({ //must use return or code below will continue executing
        error: 'content missing' 
      })
    }
  
    const note = { //note object is created
      content: body.content, 
      important: body.important || false, //if note has importance set use it, else default is false
      id: generateId(),
    }
  
    notes = notes.concat(note) //add new note to list
  
    response.json(note)
  })
  //OLD
//   app.post('/api/notes', (request, response) => {
//     const maxId = notes.length > 0 // if notes length is not greater than zero, maxId variable is set to 0
//     ? Math.max(...notes.map(n => n.id)) // if notes length is greater than zero, we go thru each note until we grab the max/biggest id
//     : 0
//     const note = request.body // handler can acces the data from the body prop of the request object
//     note.id = maxId + 1 //note.id is the new note's id and is being added to the end of the array hence maxId + 1
//     response.json(note)
//   })

  //req: info about request. response: how the req is responded to
  app.get('/', (request, response) => { //event handler, handle get requests to root
    response.send('<h1>Hello World!</h1>') //req is answered by send method
  })
  
  app.get('/api/notes', (request, response) => { // handles get requests to the notes path
    response.json(notes) //sends notes array as a JSON formatted string
  })

  app.get('/api/notes/:id', (request, response) => {
    // const id = request.params.id //gets id from req, IT'S A STRING
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id) //finds note that matches id and is returned to sender of req
    if (note) {
        response.json(note)
      } else {
        response.status(404).end() ///no data for the response so status method for setting status & end method for respoonding without sending data
      }
    // console.log(id);
    // const note = notes.find(note => {
    //     console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    //     return note.id === id //returned once a matching note is found //explicit return statement cause using clog
    //   })
    // console.log(note);
    // response.json(note)
  })
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id) //removes note, filters it out
  
    response.status(204).end() //respond to request with status code 204 and no content, and return no data with response
  })

//   const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' }) //informs receiver the data is in JSON format
//     response.end(JSON.stringify(notes)) //turns notes array into JSON
//   })
  
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
// })
app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
// app.listen(PORT) //listen to HTTP requests sent to port 3001
// console.log(`Server running on port ${PORT}`)