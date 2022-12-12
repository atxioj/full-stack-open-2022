import { useState } from "react"

// const Button = (props) => {
//   return(
//     <button onClick = {props.Click}>
//       {props.text}
//     </button>
//   )
// }
//simplified button with destructured props
const Button = ({Click, text}) => <button onClick = {Click}>{text}</button>
const App = () => {
  const [ counter, setCounter ] = useState(1)


  console.log(counter)
  const setZero = () => setCounter(0)
  const addFifty = () => setCounter(counter + 50)

  return (
    <div>
    <div>{counter}</div>
    <button onClick = {setZero}> zerooooo </button>
    <Button Click = {setZero} text='zero'/>
    <Button Click = {addFifty} text='+50'/>
    </div>
  )
}

export default App;
