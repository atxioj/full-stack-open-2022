const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type')) //log messages with morgan using tiny config

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(people)
})

app.get('/info', (request, response) => {
  const totalPeople = people.length
  const newDate = new Date()
  const line1 = `<p>Phonebook has info for ${totalPeople} people</p>`
  response.send(line1 + newDate)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = people.length > 0 ? Math.max(...people.map(p => p.id)) : 0
  const randomNumber = Math.floor(Math.random() * 10000000) + maxId
  return randomNumber
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if(people.find((person) => person.name === body.name)){
    return response.status(400).json({
      error: 'name is already in the phonebook'
    })
  }
  const personObject = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  people = people.concat(personObject)
  response.status(204).end()
})

//morgan.token('type', function (req, res) {return `{"name":"${req.body.name}", "number":"${req.body.number}"}`}) //using without stringify
morgan.token('type', (req, res) => JSON.stringify(req.body)) //using json stringify

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on: ${PORT}`);
})