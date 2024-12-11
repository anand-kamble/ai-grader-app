import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {
                location.pathname === '/' && <Button variant='contained' onClick={handleLogin}>Login</Button>
              }

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header
