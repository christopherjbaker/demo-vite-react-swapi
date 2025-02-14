import { createTheme, ThemeProvider } from "@mui/material/styles"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

export interface ThemeProps {
  children: React.ReactNode
}

const theme = createTheme({})

const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
