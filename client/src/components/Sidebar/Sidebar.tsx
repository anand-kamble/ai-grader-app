import { Paper, Typography } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <Paper style={{
        height: '100vh',
        width: '20rem',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '1rem',
    }}>
      <Typography variant="h6">Sidebar</Typography>
    </Paper>
  )
}

export default Sidebar
