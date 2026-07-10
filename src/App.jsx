import { useState, useEffect } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_WEATHERBIT_KEY

// The free plan only returns 7 days per city, so we fetch two cities
// and combine them to get enough rows for the dashboard.
const CITIES = ['Raleigh,NC', 'Seattle,WA']

// Turns a unix timestamp (seconds) into a readable time like "06:16 AM"
function formatTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function App() {
  const [days, setDays] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [condition, setCondition] = useState('All')

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

  // Summary statistic 1: how many forecast rows we are showing
  const totalDays = days.length

  // Summary statistic 2: the average low temperature across all days
  const averageLow =
    totalDays === 0
      ? 0
      : days.reduce((sum, day) => sum + day.low_temp, 0) / totalDays

  // Summary statistic 3: the brightest the moon gets during the forecast
  const brightestMoon =
    totalDays === 0 ? 0 : Math.max(...days.map((day) => day.moon_phase))

  // Every weather condition in the data, with no duplicates
  const conditions = [
    'All',
    ...new Set(days.map((day) => day.weather.description)),
  ]

  // Search by date, then narrow down by weather condition
  const visibleDays = days
    .filter((day) => day.datetime.includes(searchQuery))
    .filter(
      (day) => condition === 'All' || day.weather.description === condition,
    )

  return (
    <div className="app">
      <h1>AstroDash</h1>
      <p className="subtitle">7-day forecast for {CITIES.join(' and ')}</p>

      <div className="stats">
        <div className="stat">
          <span className="stat-value">{totalDays}</span>
          <span className="stat-label">Forecast Days</span>
        </div>
        <div className="stat">
          <span className="stat-value">{averageLow.toFixed(1)}°F</span>
          <span className="stat-label">Average Low</span>
        </div>
        <div className="stat">
          <span className="stat-value">{(brightestMoon * 100).toFixed(0)}%</span>
          <span className="stat-label">Brightest Moon</span>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by date (2026-07-10)"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <select
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        >
          {conditions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>City</th>
            <th>Low Temp</th>
            <th>Moon Rise</th>
            <th>Moon Phase</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {visibleDays.map((day) => (
            <tr key={day.city + day.datetime}>
              <td>{day.datetime}</td>
              <td>{day.city}</td>
              <td>{day.low_temp}°F</td>
              <td>{formatTime(day.moonrise_ts)}</td>
              <td>{(day.moon_phase * 100).toFixed(0)}%</td>
              <td>{day.weather.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
