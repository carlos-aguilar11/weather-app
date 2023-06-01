import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CitySelection from './CitySelection'
import WeatherDisplay from './WeatherDisplay'
import '../main.css'
import { motion } from 'framer-motion'

const ACCESS_KEY = 'tivlozErgXCxRMPFIVYkzQkrAhG_fpwD5j7dvzdprV0'

const appVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
}

const titleVariants = {
  hidden: { x: -100 },
  visible: { x: 0, transition: { type: 'spring', stiffness: 100 } },
}

const weatherVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
}

function App() {
  const [selectedCity, setSelectedCity] = useState('Auckland')
  const [cityImage, setCityImage] = useState('')

  const handleCityChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSelectedCity(event.target.value)
  }

  const fetchCityImage = async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${city}&client_id=${ACCESS_KEY}`
      )
      const { urls } = response.data
      setCityImage(urls.regular)
    } catch (error) {
      console.log('Error fetching city image:', error)
    }
  }

  useEffect(() => {
    if (selectedCity) {
      fetchCityImage(selectedCity)
    }
  }, [selectedCity])

  return (
    <div className="app">
      <motion.div
        className="background-image"
        style={{ backgroundImage: `url(${cityImage})` }}
      >
        <motion.h1
          className="app-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          WEATHER
          <motion.span className="app-weather" variants={weatherVariants}>
            APP
          </motion.span>
        </motion.h1>
        <motion.div
          className="app-content"
          variants={appVariants}
          initial="hidden"
          animate="visible"
        >
          <CitySelection onChange={handleCityChange} />
          {selectedCity && <WeatherDisplay city={selectedCity} />}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
