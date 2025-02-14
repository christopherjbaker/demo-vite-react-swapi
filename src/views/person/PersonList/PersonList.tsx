import { Link } from "react-router"

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
    <div>
      <h1>Person List</h1>
      <ul>
        {data.map((person) => (
          <li key={person.id}>
            <Link to={`/people/${person.id}`}>{person.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PersonList
