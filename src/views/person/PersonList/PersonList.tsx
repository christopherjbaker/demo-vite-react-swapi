import { Link } from "react-router"

import ErrorIndicator from "#design/ErrorIndicator"
import LoadingIndicator from "#design/LoadingIndicator"
import Page from "#design/Page"
import { usePersonList } from "#shared/services/swapi"

const PersonList: React.FC = () => {
  const { status, data, error } = usePersonList()

  if (status === "error") {
    return (
      <Page title="People">
        <ErrorIndicator error={error} />
      </Page>
    )
  }

  if (status === "pending") {
    return (
      <Page title="People">
        <LoadingIndicator />
      </Page>
    )
  }

  return (
    <Page title="People">
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
