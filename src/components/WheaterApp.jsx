import sunny from '../assets/images/sunny.png'
import { useState } from 'react'
import { getWeatherInfo } from '../utils/weatherCode'

const WheatherApp = () => {
  // GERENCIMENTO E CONTROLE DE DADOS E AÇOES
  const [location, setLocation] = useState('')
  const [data, setData] = useState(null)

  const getCoordinates = async(cityName) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=pt&format=json`

    const response = await fetch(url)

    const data = await response.json()

    if(!data.results || data.results.length == 0){
      throw new Error('Cidade não encontrada!')
    }

    const city = data.results[0]

    return {
      latitude: city.latitude,
      longitude: city.longitude,
      name: city.name,
      country: city.country
    }

  }

  const handleInputChanges = (e) => {
    setLocation(e.target.value)
    console.log(location)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(location)
    }
  }

  const search = async(cityName) => {
    try {
      // 1. Buscar as cordenadas
      const coordinates = getCoordinates(cityName)

      // 2. Pegar a latitude e longitude
      const {latitude, longitude} = coordinates

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto`.replace()

      // 4. Buscar clima
      const response = await fetch(url)

      const data = await.response.json()

      console.log('Clima: ')
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  // ELEMENTOS QUE SERÃO RENDERIZADOS
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">London</div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChanges}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="weather">
          <img src={sunny} alt="Clear sky" />
          <div className="weather-type">Clear</div>
          <div className="temp">28°</div>
        </div>

        <div className="weather-date">
          <p>Sat, 15 Ago</p>
        </div>

        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">35%</div>
          </div>

          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">3 km/h</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WheatherApp