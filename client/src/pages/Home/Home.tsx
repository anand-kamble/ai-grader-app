import { Button, Paper, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
      <Paper style={{
        padding: '2rem',
      }}>
        <Typography variant="h3">Welcome to</Typography>
        <Typography variant="h1">AI Grader</Typography>

        <Button variant="outlined" color="primary">Get Started</Button>
      </Paper>
    </div>
  )
}

export default Home
