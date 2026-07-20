import { useParams, Link } from 'react-router-dom'
import { formatTime } from '../utils'

function DayDetail({ days }) {
  // The city and date come straight from the URL, so every day has its
  // own shareable link like /day/Raleigh,NC/2026-07-10
  const { city, date } = useParams()

  const day = days.find(
    (item) => item.city === city && item.datetime === date,
  )

  if (days.length === 0) {
    return <p>Loading...</p>
  }

  if (!day) {
    return (
      <div>
        <h1>Day not found</h1>
        <Link to="/">Back to dashboard</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/">&larr; Back to dashboard</Link>
      <h1>
        {day.datetime} in {day.city}
      </h1>
      <p className="subtitle">{day.weather.description}</p>

      {/* Extra details that the dashboard table does not show */}
      <ul className="details">
        <li>
          <span>High / Low</span>
          <span>
            {day.max_temp}°F / {day.low_temp}°F
          </span>
        </li>
        <li>
          <span>Feels Like (High)</span>
          <span>{day.app_max_temp}°F</span>
        </li>
        <li>
          <span>Humidity</span>
          <span>{day.rh}%</span>
        </li>
        <li>
          <span>Wind</span>
          <span>
            {day.wind_spd.toFixed(1)} mph {day.wind_cdir_full}
          </span>
        </li>
        <li>
          <span>Chance of Rain</span>
          <span>{day.pop}%</span>
        </li>
        <li>
          <span>UV Index</span>
          <span>{day.uv.toFixed(1)}</span>
        </li>
        <li>
          <span>Cloud Cover</span>
          <span>{day.clouds}%</span>
        </li>
        <li>
          <span>Sunrise / Sunset</span>
          <span>
            {formatTime(day.sunrise_ts)} / {formatTime(day.sunset_ts)}
          </span>
        </li>
        <li>
          <span>Moonrise / Moonset</span>
          <span>
            {formatTime(day.moonrise_ts)} / {formatTime(day.moonset_ts)}
          </span>
        </li>
        <li>
          <span>Moon Phase</span>
          <span>{(day.moon_phase * 100).toFixed(0)}% illuminated</span>
        </li>
      </ul>
    </div>
  )
}

export default DayDetail
