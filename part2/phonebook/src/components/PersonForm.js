import { useState } from 'react'

import phonebookService from '../services/person'
//form to add person and number to phonebook
const PersonForm = ({persons, setPersons, setPersonAddedNotif}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const userTyping = (event) => {
        setNewName(event.target.value)
      }
      const userTypingNumber = (event) => {
        setNewNumber(event.target.value)
      }
    const addPerson = (event) => {
        event.preventDefault()
        //alerts user if name is already in the phonebook
        if (persons.find(({name}) => name === newName)){
          alert(`${newName} is already added to the phonebook`)
          return
        }

        const personObject = {
          name: newName,
          number: newNumber
        }
        //checks if person's number is already in the phonebook and user can choose to replace the person
        if (persons.find(({number}) => number === newNumber)){
          if(window.confirm(`"${newNumber}" is already in the phonebook. Replace the old user with the new one?`)) {
            const oldNumber = persons.find(({number}) => number === newNumber)
            const numberID = oldNumber.id
            return phonebookService
              .update(numberID, personObject)
              .then(res => {
                setPersons(persons.map(p => p.id !== numberID ? p : res.data)) //finds person by id and replaces 
                setNewName('')
                setNewNumber('')
                setPersonAddedNotif(`${oldNumber.name} has been replaced with ${res.data.name}`)
                setTimeout(() => {
                  setPersonAddedNotif(null)
                }, 5000)
              })
          }
          return
        }
        //add person to phonebook
        phonebookService
          .create(personObject)
          .then(person => {
            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
            setPersonAddedNotif(`"${person.name}" has been added to the phonebook`)
            setTimeout(() => {
              setPersonAddedNotif(null)
            }, 5000)
          })
      }  

    return (
    <form onSubmit={(event) => addPerson(event)}>
      <div>
          name: <input value={newName} onChange={userTyping}/>
          <br></br>
          number: <input value={newNumber} onChange={userTypingNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

  export default PersonForm