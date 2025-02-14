import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export interface PageProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ title, subtitle, children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>
        {subtitle && <Typography>{subtitle}</Typography>}
      </div>

      {children}
    </Box>
  )
}

export default Page
