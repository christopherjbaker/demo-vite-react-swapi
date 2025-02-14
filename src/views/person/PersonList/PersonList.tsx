import { Link } from "react-router"

import Page from "#design/Page"
import { usePersonList } from "#shared/services/swapi"

const PersonList: React.FC = () => {
  const { status, data, error } = usePersonList()

  if (status === "error") {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    )
  }

  if (status === "pending") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <Page title="Person List">
      <ul>
        {data.map((person) => (
          <li key={person.id}>
            <Link to={`/people/${person.id}`}>{person.name}</Link>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export default PersonList
