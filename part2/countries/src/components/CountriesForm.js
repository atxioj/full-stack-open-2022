const CountriesForm = ({countrySearch, setCountrySearch}) => {
    const userTyping = (event) => {
      setCountrySearch(event.target.value)
    }
    return (
      <div>
      <form>
      find countries <input value={countrySearch} onChange={userTyping}/>
      </form>
  
      </div>
    )
  }

export default CountriesForm