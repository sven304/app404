import { Link } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Главная страница
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button component={Link} to="/chats" color="primary">
            Чаты
          </Button>
          <Button component={Link} to="/profile" color="primary">
            Профиль
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default HomePage
