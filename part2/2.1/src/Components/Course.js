const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Course = ({course}) => {
    // console.log(course.parts[1].id)
    return (
    course.parts.map(course => <Part key={course.id} part={course} /> )
  
    )
  }

export default Course