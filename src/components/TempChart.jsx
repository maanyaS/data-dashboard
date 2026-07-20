import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

// Chart 1: how the high temperature changes day by day in each city.
// Recharts wants one object per x-axis point, so each date becomes one row
// with a separate key for every city.
function TempChart({ days, cities }) {
  const rows = []

  days.forEach((day) => {
    let row = rows.find((item) => item.datetime === day.datetime)
    if (!row) {
      row = { datetime: day.datetime }
      rows.push(row)
    }
    row[day.city] = day.max_temp
  })

  rows.sort((a, b) => a.datetime.localeCompare(b.datetime))

  const colors = ['#8b7cf6', '#4ec9d4']

  return (
    <div className="chart-card">
      <h3>High Temperature by Day</h3>
      <p className="chart-note">
        Raleigh runs similar to Seattle's temperature this week.
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={rows}>
          <CartesianGrid stroke="#35305c" />
          <XAxis dataKey="datetime" stroke="#a49fc4" fontSize={12} />
          <YAxis stroke="#a49fc4" fontSize={12} unit="°F" />
          <Tooltip
            contentStyle={{ background: '#241f45', border: '1px solid #4a4278' }}
          />
          <Legend />
          {cities.map((city, index) => (
            <Line
              key={city}
              type="monotone"
              dataKey={city}
              stroke={colors[index]}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TempChart
