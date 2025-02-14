import { Outlet } from "react-router"

import Layout from "#design/Layout"

const AppLayout: React.FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default AppLayout
