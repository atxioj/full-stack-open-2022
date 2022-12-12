// component
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greetings im a footer
    </div>
  )
}

const App = () => {
  const name = 'peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      {/* reusing compnents  */}
      <Hello name = 'Maya' age={26 + 10}/>
      <Hello name = {name} age={age}/>
      <Hello />
      <Footer />
    </>
  )
}

export default App