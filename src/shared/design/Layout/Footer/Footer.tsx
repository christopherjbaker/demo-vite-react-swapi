import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const Footer: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: { sm: "center", md: "left" },
        gap: 0.5,
        py: 2,
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>Join the newsletter</Typography>
      <Typography sx={{ color: "text.secondary" }}>
        Subscribe for weekly updates. No spams ever!
      </Typography>
    </Container>
  )
}

export default Footer
