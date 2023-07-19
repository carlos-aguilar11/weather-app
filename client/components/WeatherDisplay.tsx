import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { WEATHER_ACCESS_KEY } from '../config'

const apiKey = WEATHER_ACCESS_KEY
const WeatherDisplay: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        )
        setWeatherData(response.data)
        setLoading(false)
      } catch (error) {
        console.log('Error fetching weather data:', error)
        setLoading(false)
      }
    }

    setLoading(true)
    fetchWeatherData()
  }, [city])

  const formatTemperature = (temperature: number) => {
    const celsiusTemperature = temperature - 273.15
    return `${celsiusTemperature.toFixed(1)}°C`
  }
  const iconCode = weatherData?.weather[0]?.icon
  const weatherIcon = `https://openweathermap.org/img/w/${iconCode}.png`

  return (
    <div key={city}>
      {' '}
      {/* Add key prop based on the city */}
      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
        >
          <h2>Weather in {city}</h2>
          <p>Temperature: {formatTemperature(weatherData.main.temp)}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          {weatherIcon && <img src={weatherIcon} alt={weatherData[0]?.icon} />}
        </motion.div>
      ) : (
        <p>Failed to fetch weather data.</p>
      )}
    </div>
  )
}

export default WeatherDisplay
