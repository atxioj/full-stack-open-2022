import {useState} from 'react'

const Button = ({click, text}) => (
  <button onClick={click}>{text}</button>
)
function App() {
  const anecdotes = [
    'The best way to get a project done faster is to start sooner',
    'How does a project get to be a year late?... One day at a time.',
    'Before software can be reusable it first has to be usable.',
    'Good judgment comes from experience, and experience comes from bad judgment.'
  ]
  const allVotes = [0,0,0,0]
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(allVotes)
  
  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max-min) + min);
  }

  // const changeVotes = selected => e => {
  //   let newArr = [...votes]
    
  //   newArr[0] = e.target.value
  //   setVotes(newArr)
  // }

  //increment the votes, uses setVotes state
  const incr = index => {
    setVotes(items => {
      // return [
      //   ...ex.slice(0,index),
      //   ex[index] + 1,
      //   ...ex.slice(index + 1),
      // ]
      //if index equals the passed index, increment it, else return same number
      return items.map((item, j) => {
        return j === index ? item + 1 : item
      })
    })
  }
  const increment = () => incr(selected)
  const randomAnecdote = () => setSelected(getRandom(0,4))
  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}

      <p>has {votes[selected]} votes</p>

      <Button click={increment}text='vote'/>
      <Button click={randomAnecdote} text='next anecdote'/>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[maxIndex]}
      <br></br>
      <p>has {maxVotes} votes</p>

    </div>
  )
}

export default App;
