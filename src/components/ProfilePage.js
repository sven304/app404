import { Container, Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function ProfilePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Профиль
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1">
            Здесь будет информация о профиле
          </Typography>
        </Box>
        <Button component={Link} to="/" color="primary">
          На главную
        </Button>
      </Box>
    </Container>
  )
}

export default ProfilePage
