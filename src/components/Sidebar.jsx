import { Link } from 'react-router-dom'

// Shown on every page, so the dashboard and the detail view look the same
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">AstroDash</h2>
      <nav>
        <Link to="/">Dashboard</Link>
        <a href="https://www.weatherbit.io/api">About the Data</a>
      </nav>
    </aside>
  )
}

export default Sidebar
