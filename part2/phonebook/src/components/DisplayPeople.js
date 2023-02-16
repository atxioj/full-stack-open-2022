import axios from 'axios'

const DisplayPerson = ({person, setPersons, setErrorMessage}) => {
  const deletePerson = (id) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      return axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(res => {
          setPersons(persons => persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setErrorMessage(`${person.name} has already been deleted from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
    console.log('NOT - DELETED')

  }
    return(
      <p>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </p>
    )
  }

const DisplayPeople = ({persons, setPersons, newSearch, setErrorMessage}) => {
      return (
        <div>
          {persons.filter(user => user.name.toLowerCase().includes(newSearch)).map //will filter people as user types in search
          (person => <DisplayPerson key={person.id} setPersons={setPersons} person={person} setErrorMessage={setErrorMessage}/>)}
        </div>
      )

  }

  export default DisplayPeople