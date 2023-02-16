import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm';
import FilterPeople from './components/FilterPeople';
import DisplayPeople from './components/DisplayPeople';
import phonebookService from './services/person'
import './index.css'
const Title = (props) => {
  return(
    <h3>{props.content}</h3>
  )
}

const Notification = ({source, errorMessage}) => {
  if (source === null) {
    return null
  }
  if (source === errorMessage) {
    return (
      <div className='errorNotification'>
        {source}
      </div>
    )
  }
  return (
    <div className='notification'>
      {source}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newSearch, setNewSearch] = useState('')
  const [personAddedNotif, setPersonAddedNotif] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  //data from db
  const hook = () => {

    phonebookService
      .getAllPeople()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification source={personAddedNotif}/>
      <Notification source={errorMessage} errorMessage={errorMessage}/>

      <FilterPeople newSearch={newSearch} setNewSearch={setNewSearch}/>
      <Title content='add a new person'/>

      <PersonForm persons={persons} setPersons={setPersons} setPersonAddedNotif={setPersonAddedNotif}/>
      <Title content='Numbers'/>
      <DisplayPeople persons={persons} setPersons={setPersons} newSearch={newSearch} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App;
