import { useParams } from "react-router"

import { usePersonDetails } from "#shared/services/swapi"

const PersonDetails: React.FC = () => {
  const { personId } = useParams() as { personId: string }

  const { status, data, error } = usePersonDetails(personId)

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
      <h1>Person: {data.name}</h1>
    </div>
  )
}

export default PersonDetails
