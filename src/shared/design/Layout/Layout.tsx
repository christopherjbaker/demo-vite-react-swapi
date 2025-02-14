import Divider from "@mui/material/Divider"

import Content from "./Content"
import Footer from "./Footer"
import Header from "./Header"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Divider />
      <Footer />
    </>
  )
}

export default Layout
