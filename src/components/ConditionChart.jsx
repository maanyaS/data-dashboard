import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

// Chart 2: a different angle on the data — how often each weather
// condition shows up across the whole forecast.
function ConditionChart({ days }) {
  const rows = []

  days.forEach((day) => {
    const name = day.weather.description
    const row = rows.find((item) => item.name === name)
    if (row) {
      row.count = row.count + 1
    } else {
      rows.push({ name, count: 1 })
    }
  })

  rows.sort((a, b) => b.count - a.count)

  return (
    <div className="chart-card">
      <h3>How Often Each Condition Appears</h3>
      <p className="chart-note">
        Cloudy days dominate the forecast — clear skies are the rare ones.
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={rows}>
          <CartesianGrid stroke="#35305c" />
          <XAxis dataKey="name" stroke="#a49fc4" fontSize={11} />
          <YAxis stroke="#a49fc4" fontSize={12} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: '#2c2652' }}
            contentStyle={{ background: '#241f45', border: '1px solid #4a4278' }}
          />
          <Bar dataKey="count" fill="#8b7cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ConditionChart
