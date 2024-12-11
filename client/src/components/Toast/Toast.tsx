import { Alert, Box, Slide } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const Toast = () => {

    const { open, message, variant } = useSelector((state: RootState) => state.toast)

    return (
        <Slide direction='left' in={open}>
            <Box sx={{
                position: 'fixed',
                top: 64,
                right: 0,
                margin: '1rem',
                minWidth: '300px'
            }}>
                <Alert severity={variant} variant='outlined'>
                    {message}
                </Alert>
            </Box>
        </Slide>
    )
}

export default Toast
