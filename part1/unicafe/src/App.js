import { useState } from 'react'

const Heading = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({click, text}) => (
  <button onClick = {click}>{text}</button>
)

// const DisplayFeedbackAmount = ({name, feedback}) => (
//   <p>{name} {feedback}</p>
// )
const StatisticLine = ({text, value, sign}) => (
  <tr>  
    <td>{text}</td>
    <td>{value}{sign}</td>
  </tr>
  //<p>{text} {value}</p>
)
const Statistics = ({good, bad, neutral}) => {
  if (good === 0 && neutral === 0 && bad ===0){ 
    return (
      <div>No feedback given</div>
    )
  }
  return (
  <table>
    <tbody>

    <StatisticLine text='good' value={good}/>
    <StatisticLine text='neutral' value={neutral}/>
    <StatisticLine text='bad' value={bad}/>
    <StatisticLine text='all' value={good + bad + neutral}/>
    <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)}/>
    <StatisticLine text='positive' value={good / (good + neutral + bad) * 100} sign='%'/>
    </tbody>
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Heading text = 'give feedback'/>
      <div>
        <Button click={incrementGood} text="good"/>
        <Button click={incrementNeutral} text="neutral"/>
        <Button click={incrementBad} text="bad"/>
      </div>
      <Heading text = 'statistics'/>
      {/*
      <DisplayFeedbackAmount name='good' feedback={good} />
      <DisplayFeedbackAmount name='neutral' feedback={neutral} />
      <DisplayFeedbackAmount name='bad' feedback={bad} />

      <DisplayFeedbackAmount name='all' feedback={good + neutral + bad} />
      <DisplayFeedbackAmount name='average' feedback={(neutral + bad) / good} />
      <DisplayFeedbackAmount name='average' feedback={good / (good + neutral + bad) * 100} /> */}
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}


export default App;
