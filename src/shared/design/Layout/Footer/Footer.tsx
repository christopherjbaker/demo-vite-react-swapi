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
      }}
    >
      <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        Join the newsletter
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Subscribe for weekly updates. No spams ever!
      </Typography>
    </Container>
  )
}

export default Footer
