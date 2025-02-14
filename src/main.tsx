import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router"

import Theme from "#design/theme"

import App from "./App"

const element = document.getElementById("root")
if (!element) throw new Error("Cannot find #root element.")

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <Theme>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Theme>
  </React.StrictMode>,
)
