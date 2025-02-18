import { Outlet } from "react-router"

import Layout, { NavigationItem } from "#design/Layout"

const AppLayout: React.FC<{ navigation: NavigationItem[] }> = ({
  navigation,
}) => {
  return (
    <Layout navigation={navigation}>
      <Outlet />
    </Layout>
  )
}

export default AppLayout
