import { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'
import CountriesForm from './components/CountriesForm'


function App() {
  const [countries, setCountries] = useState([])
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log('error')})
  }
  useEffect(hook, [])
  const [countrySearch, setCountrySearch] = useState('')
  return (
    <div>
      <CountriesForm countrySearch={countrySearch} setCountrySearch={setCountrySearch}/>
      <DisplayCountries countries={countries} countrySearch={countrySearch} />
    </div>
  )
}

export default App;
