import { Route, Routes } from "react-router"

import AppLayout from "../views/AppLayout"
import Home from "../views/Home"
import PersonDetails from "../views/person/PersonDetails"
import PersonLayout from "../views/person/PersonLayout"
import PersonList from "../views/person/PersonList"

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="people" element={<PersonLayout />}>
          <Route index element={<PersonList />} />
          <Route path=":personId" element={<PersonDetails />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
