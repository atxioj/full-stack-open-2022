const Header = (props) => { 
  return(
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return ( 
  <p>{props.parts}</p>
)}

const Content = (props) => { 
  console.log(props)
  return(
    // <p>{props.part} {props.ex}</p>
    <div>
      <Part parts = {props.part.parts[0].name + ' ' + props.part.parts[0].exercises}/>
      <Part parts = {props.part.parts[1].name + ' ' + props.part.parts[1].exercises}/>
      <Part parts = {props.part.parts[2].name + ' ' + props.part.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => { 
  return(
    <p>Number of exercises {props.ex.parts[0].exercises + props.ex.parts[1].exercises + props.ex.parts[2].exercises}</p>
  )
}


const App = () => {
  const course = { 
    name: 'Half Stack application development',
    parts:[ 
      {
      name: 'Fundamentals of React',
      exercises: 10 
    },
    {
      name:'Using props to pass data',
      exercises: 7 
    },
    {
      name: 'State of a component',
      exercises: 14 
    } 
  ] 
}

  return(
    <div>
      <Header course = {course} />
      <Content part = {course}/>
      <Total ex = {course}/>

    </div>
  )
}

export default App;
