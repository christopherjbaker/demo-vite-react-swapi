import Container from "@mui/material/Container"

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
    >
      {children}
    </Container>
  )
}

export default Footer
