import React from 'react'
import { motion } from 'framer-motion'

const CitySelection: React.FC<{
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}> = ({ onChange }) => {
  const cities = [
    'Auckland',
    'New York',
    'London',
    'Tokyo',
    'Paris',
    'Sydney',
    'Los Angeles',
    'Wellington',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  }

  return (
    <motion.div
      className="city-select"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Select a city:</h2>
      <select onChange={onChange}>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </motion.div>
  )
}

export default CitySelection
