import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import { isValidElement } from "react"
import { useParams } from "react-router"

import ErrorIndicator from "#design/ErrorIndicator"
import LoadingIndicator from "#design/LoadingIndicator"
import Page from "#design/Page"
import { Person, usePersonDetails } from "#shared/services/swapi"

const rows: Array<{
  key: keyof Person
  label: string
  transform?: (value: unknown) => React.ReactNode
}> = [
  { key: "name", label: "Name" },
  { key: "gender", label: "Gender" },
  { key: "birth_year", label: "Born" },
  { key: "height", label: "Height", transform: (value) => `${value} cm` },
  { key: "mass", label: "Weight", transform: (value) => `${value} kg` },
  { key: "eye_color", label: "Eyes" },
  { key: "hair_color", label: "Hair" },
  { key: "skin_color", label: "Complexion" },
]

const PersonDetails: React.FC = () => {
  const { personId } = useParams() as { personId: string }

  const { status, data, error } = usePersonDetails(+personId)

  if (status === "error") {
    return (
      <Page title="Profile">
        <ErrorIndicator error={error} />
      </Page>
    )
  }

  if (status === "pending") {
    return (
      <Page title="Profile">
        <LoadingIndicator />
      </Page>
    )
  }

  return (
    <Page title={`Profile: ${data.name}`}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: { xs: "100%", sm: "50%" },
        }}
      >
        <Table aria-label="person details" stickyHeader>
          <TableBody>
            {rows.map(({ key, label, transform }) => {
              const value = transform ? transform(data[key]) : data[key]
              if (
                !isValidElement(value) &&
                typeof value !== "string" &&
                typeof value !== "number"
              ) {
                return null
              }

              return (
                <TableRow
                  key={label}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {label}
                  </TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  )
}

export default PersonDetails
