import { useState } from 'react'
import { Link } from 'react-router-dom'
import TempChart from '../components/TempChart'
import ConditionChart from '../components/ConditionChart'
import { formatTime } from '../utils'

function Dashboard({ days, cities }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [condition, setCondition] = useState('All')

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
    <div>
      <h1>Dashboard</h1>
      <p className="subtitle">7-day forecast for {cities.join(' and ')}</p>

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

      <div className="charts">
        <TempChart days={days} cities={cities} />
        <ConditionChart days={days} />
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
              <td>
                {/* Each row links to its own detail page */}
                <Link to={`/day/${day.city}/${day.datetime}`}>
                  {day.datetime}
                </Link>
              </td>
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

export default Dashboard
