import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountryWeather  = ({index, countriesSearchedByUser}) => {
    const [temp, setTemp] = useState([])
    const [wind, setWind] = useState([])
    const [icon, setIcon] = useState('')
  
    const api_key = process.env.REACT_APP_API_KEY
    const coordinates = countriesSearchedByUser[index].latlng
  
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${api_key}&units=imperial`)
        .then(response => {
          setTemp(response.data.main.temp)
          setWind(response.data.wind.speed)
          setIcon(response.data.weather[0].icon)
        })
        .catch(error => {
          console.log('error')})
    }, [api_key, coordinates])
    const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`
    return (
      <div>
      <h2>Weather in {countriesSearchedByUser[index].name.common}</h2>
      <p>Temperature: {temp} fahrenheit</p>
      <img src={weatherIcon} alt='weather icon'></img>
      <p>wind: {wind} m/s</p>
      </div>
    )
  }

export default DisplayCountryWeather