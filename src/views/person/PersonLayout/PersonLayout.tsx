import { Outlet } from "react-router"

const PersonLayout: React.FC = () => {
  return (
    <div>
      <div>PersonLayout</div>
      <Outlet />
    </div>
  )
}

export default PersonLayout
