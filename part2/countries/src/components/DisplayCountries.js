import { useEffect, useState } from 'react'
import DisplayCountryWeather from '../components/DisplayCountryWeather'

const DisplayCountryProfile = ({countriesSearchedByUser, index}) => {
    return (
      <div>
      <h1>{countriesSearchedByUser[index].name.common}</h1>
      <div>Capital: {countriesSearchedByUser[index].capital}</div>
      <div>Area: {countriesSearchedByUser[index].area}</div>
      <h3>Languages:</h3>
      <ul>
      <div>{Object.values(countriesSearchedByUser[index].languages).map((value, index) => <li key = {index}>{value}</li>)}</div>
      </ul>
      <img src={countriesSearchedByUser[index].flags.png} width='100px' alt="country flag"></img>
      <DisplayCountryWeather index={index} countriesSearchedByUser={countriesSearchedByUser}/>
      </div>
    )
  }
  const CountryLine =({country, index, countriesSearchedByUser, setButtonState, buttonState, handleClick}) => {
    useEffect( () => {
      setButtonState([])
    }, [setButtonState])

    return (
      <div><p>{country.name.common} <button onClick={() => handleClick(index)}>{buttonState.includes(index) ? 'hide' : 'show'}</button></p>
     { buttonState.includes(index) ? <DisplayCountryProfile countriesSearchedByUser={countriesSearchedByUser} index={index}/>: null}</div>
    )
  }

const DisplayCountries = ({countries, countrySearch}) => {
    const countriesSearchedByUser = countries.filter(country => country.name.common.toLowerCase().includes(countrySearch))
    const [buttonState, setButtonState] = useState([])

    const handleClick = (i) => {
      if (buttonState.includes(i)){
        return setButtonState(buttonState.filter(index => index !== i))
      }
      setButtonState(btns => {return [...btns, i]})
    }

    if (countriesSearchedByUser.length > 10 && countrySearch.length !== 0){
      return(
        <div>
          Too many matches, please specify more
        </div>
      )
    }
    //if one result, render component with country data
    if (countriesSearchedByUser.length === 1){
      return(
        <DisplayCountryProfile countriesSearchedByUser={countriesSearchedByUser} index={0}/>
      )
    }
    

    if (countrySearch.length !== 0){
      return(
        <div>
          {countries.filter(country => country.name.common.toLowerCase().includes(countrySearch)).map((country, i) =>
          <CountryLine buttonState={buttonState} setButtonState={setButtonState} handleClick={handleClick} key={i} index={i} country={country} countriesSearchedByUser={countriesSearchedByUser}/>  ) 
          } {console.log(buttonState)}
        </div>  
      ) 
    }

    return(
      <div>
        {countries.filter(country => country.name.common.toLowerCase().includes(countrySearch)).map(country => <p key={country.name.common}>{country.name.common}</p>)}
      </div>
    )
  }

  export default DisplayCountries