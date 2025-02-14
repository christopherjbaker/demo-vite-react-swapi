import { Link, Outlet } from "react-router"

const navigation = [
  { to: "/", label: "Home" },
  { to: "/people", label: "People" },
]

const AppLayout: React.FC = () => {
  return (
    <div>
      <div>AppLayout</div>
      <nav>
        <ul>
          {navigation.map(({ to, label }) => (
            <li key={label}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </div>
  )
}

export default AppLayout
