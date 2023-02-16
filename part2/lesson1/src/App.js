import { useState, useEffect } from 'react'
//import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes' //functions of module can be used directly with variable noteService
import './index.css'
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}


const App = () => {
  // const result = notes.map(note => note.content)
  const [notes, setNotes] = useState([]) //notes: for accesing, setNotes: example for adding to list of notes
  const [newNote, setNewNote] = useState( //newNote: for storing user input, setNewNote: update what's in newNote
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  //part2 e:
  const [errorMessage, setErrorMessage] = useState(null)
  const Notification = ({ message }) => {// component to display error
    if (message === null) { //the message prop received is the errorMessage state
      return null           //errorMessage state is passed from server(only if error occurs)
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  
  //
  // useEffect(() => { //first, component is rendered but data hasn't been fetched yet
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes') //fetches data from server
  //     .then(response => { //event handler for the operation
  //       console.log('promise fulfilled')
  //       setNotes(response.data) //stores the notes from the server into the setNotes state
  //     })
  // }, [])
  //OLD
  // const hook = () => { //first, component is rendered but data hasn't been fetched yet
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes') //fetches data from server
  //     .then(response => { //event handler for the operation
  //       console.log('promise fulfilled')
  //       setNotes(response.data) //stores the notes from the server into the setNotes state
  //     })
  // }
  // useEffect(hook, [])
  //NEW
  useEffect(() => { //waits for notes from server and displays once received
    // noteService
    //   .getAll() //gets all notes

      // .then(response => {
      //   //receives response that contains entire HTTP request response
      //   setNotes(response.data) //sets notes state with notes from server
      // })
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes) //directly uses data returned
      })
  }, [])
  //if showAll state is true: shows all notes. false: shows important notes:
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => { //creates/sets up object for new note user is adding
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(), //.toISOString(),
      important: Math.random() > 0.5
      // id: notes.length + 1, - let server generate id for our resources
    }
    //OLD
    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response => {
    //     setNotes(notes.concat(response.data)) //use concat, does note change original array, create copy of it
    //     console.log(response)
    //   })
    //NEW
    noteService
      .create(noteObject) //add note object to server
      //NEW
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      //OLD
      // .then(response => { //updates notes with new note
      //   setNotes(notes.concat(response.data))
      //   setNewNote('')
    })
    // setNotes(notes.concat(noteObject)) //adds user's note to list of notes
    // setNewNote('') //empties input form after user clicks save button
  }
  const handleNoteChange = (event) => {//text changes in input field as user types in it
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => { //when we toggle button, id of that button is passed and used
    //OLD
    // const url = `http://localhost:3001/notes/${id}` //unique url for each note based on id
    // const note = notes.find(n => n.id === id) //find method finds note we want and assisgns it to note const
    // const changedNote = { ...note, important: !note.important } //creates new object, a copy of old note/ properties, and flips value of importance using !
    // //changedNote is shallow copy, references to old object
    // axios.put(url, changedNote).then(response => { 
    //   setNotes(notes.map(n => n.id !== id ? n : response.data))
      //using axios put we SEND changedNote object to the server using url, it will be used later when using map method 
      //using map: if id does not match id of button we toggled, simply copy it over
      //if id matches: copy the updated note over: updated note is already in the server as seen earlier when put was used
    //NEW
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => { //update id with changed note
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage( //sets state with note content that was removed
          `Note '${note.content}' was already removed from the server`
        )
        setTimeout(() => { //timer will set error message state to null after 5 seconds
          setErrorMessage(null)
        }, 5000) 
    //   //NEW, OLD
    //   .then(returnedNote => {
    //     setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    //   })
    // //OLD
    // //   .then(response => {
    // //     setNotes(notes.map(note => note.id !== id ? note : response.data))
    // // })
    // .catch(error => {
    //   alert(
    //     `the note '${note.content}' was already deleted from server`
    //   )
      setNotes(notes.filter(n => n.id !== id)) //if button pressed on deleted note, every note that does not match that deleted note id 
      //is added to new array without deleted note
    })

  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        {/* setShowAll sets showAll to opposite state, starts as true, if true: shows All notes */}
        <button onClick={() => setShowAll(!showAll)}>
          {/* {console.log('showall:', showAll)} */}
          show {showAll ? 'important' : 'all' } 
          {/* if showAll state is currently true then button says important, if false: says all */}
        </button>
      </div>
      <ul>
        {/* Hardcoded
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
        {/* Using index
        {notes.map((note, i) => 
        <li key={i}>
          {note.content}
        </li>
        )} */}
        {/* Using map
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
        )} */}
        {/* {notes.map(note => <Note key={note.id} note={note} /> )} */}
        {notesToShow.map(note => <Note 
          key={note.id} 
          note={note}
          toggleImportance = {() => toggleImportanceOf(note.id)}
          /> 
        )}
        

      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
      <Footer />
    </div>
  )
}


// const App = (props) => {
//   // const result = notes.map(note => note.content)
//   const [notes, setNotes] = useState(props.notes) //notes: for accesing, setNotes: example for adding to list of notes
//   const [newNote, setNewNote] = useState( //newNote: for storing user input, setNewNote: update what's in newNote
//     'a new note...'
//   )
//   const [showAll, setShowAll] = useState(true)
//   //if showAll state is true: shows all notes. false: shows important notes:
//   const notesToShow = showAll ? notes : notes.filter(note => note.important)

//   const addNote = (event) => { //creates/sets up object for new note user is adding
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       date: new Date().toISOString(),
//       important: Math.random() < 0.5,
//       id: notes.length + 1,
//     }
//     setNotes(notes.concat(noteObject)) //adds user's note to list of notes
//     setNewNote('') //empties input form after user clicks save button
//   }
//   const handleNoteChange = (event) => {//text changes in input field as user types in it
//     console.log(event.target.value);
//     setNewNote(event.target.value)
//   }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         {/* setShowAll sets showAll to opposite state, starts as true, if true: shows All notes */}
//         <button onClick={() => setShowAll(!showAll)}>
//           {console.log('showall:', showAll)}
//           show {showAll ? 'important' : 'all' } 
//           {/* if showAll state is currently true then button says important, if false: says all */}
//         </button>
//       </div>
//       <ul>
//         {/* Hardcoded
//         <li>{notes[0].content}</li>
//         <li>{notes[1].content}</li>
//         <li>{notes[2].content}</li> */}

//         {/* Using index
//         {notes.map((note, i) => 
//         <li key={i}>
//           {note.content}
//         </li>
//         )} */}
//         {/* Using map
//         {notes.map(note => 
//           <li key={note.id}>
//             {note.content}
//           </li>
//         )} */}

//         {/* {notes.map(note => <Note key={note.id} note={note} /> )} */}
//         {notesToShow.map(note => <Note key={note.id} note={note}/> )}
        

//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote}
//         onChange={handleNoteChange}/>
//         <button type="submit">save</button>
//       </form>   
//     </div>
//   )
// }

export default App;
