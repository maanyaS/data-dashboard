import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import DayDetail from './pages/DayDetail'
import './App.css'

const API_KEY = import.meta.env.VITE_WEATHERBIT_KEY

// The free plan only returns 7 days per city, so we fetch two cities
// and combine them to get enough rows for the dashboard.
const CITIES = ['Raleigh,NC', 'Seattle,WA']

function App() {
  const [days, setDays] = useState([])

  useEffect(() => {
    // Fetch one city's 7-day forecast and tag each day with the city name
    const fetchCity = async (city) => {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&units=I&key=${API_KEY}`
      const response = await fetch(url)
      const json = await response.json()
      return json.data.map((day) => ({ ...day, city }))
    }

    const fetchAllCities = async () => {
      const forecasts = await Promise.all(CITIES.map(fetchCity))
      setDays(forecasts.flat())
    }

    fetchAllCities()
  }, [])

  return (
    <div className="layout">
      {/* Sidebar sits outside the routes, so it shows on every page */}
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard days={days} cities={CITIES} />} />
          <Route path="/day/:city/:date" element={<DayDetail days={days} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
