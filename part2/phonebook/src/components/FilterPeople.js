
//component and function that filters the people by search term
const FilterPeople = ({newSearch, setNewSearch}) => {
    const searchPeople = (event) => {
        setNewSearch(event.target.value)
      }
    return (
      <div>
        <form>
      search the phonebook: <input value={newSearch} onChange={searchPeople}/>
        </form>
      </div>
    )
  }

export default FilterPeople