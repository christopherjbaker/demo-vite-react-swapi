import { Route, Routes } from "react-router"

import AppLayout from "../views/AppLayout"

import Home from "../views/Home"

import PersonLayout from "../views/person/PersonLayout"
import PersonList from "../views/person/PersonList"
import PersonDetails from "../views/person/PersonDetails"

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="people" element={<PersonLayout />}>
          <Route index element={<PersonList />} />
          <Route path=":id" element={<PersonDetails />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
