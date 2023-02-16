import Course from './Components/Course'

const Header = ({ course }) => <h1>{course}</h1>
const SubHeader = ({course}) => <h2>{course}</h2>

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>

//plug in the index of the part that you want to get the total amount of exercises for those parts:
const TotalExercises = ({theCourse}) => {
  const totalExercises = theCourse.parts.reduce((sum, part) => {return sum + part.exercises}, 0)
  return (
    <p><b>Total of {totalExercises} exercises</b></p>
  )
}

// const Content = ({ parts }) => 
//   <>
//     <Part
//       part={parts[0]} 
//     />
//     <Part
//       part={parts[1]} 
//     />
//     <Part
//       part={parts[2]} 
//     />      
//   </>



const App = () => {
  const course = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  // const totalExercises = course[0].parts.reduce((sum, part) => {return sum + part.exercises}, 0)
  return (
    <div>
    <Header course= 'Web development curriculum'/>
    <SubHeader course={course[0].name} />
    <Course course={course[0]} />
    <TotalExercises theCourse={course[0]}/>
    <SubHeader course={course[1].name} />
    <Course course={course[1]} />
    <TotalExercises theCourse={course[1]}/>
    </div>
  )
}

export default App;
