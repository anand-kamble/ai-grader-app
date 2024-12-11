import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Paper, TextField, Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/themeContext/themeContext';

const Dashboard = () => {

    const dispatch = useDispatch<AppDispatch>();
    const theme = useContext(ThemeContext);

    const { loading } = useSelector((state: RootState) => state.user);

    const question = "What is the capital of France?"


    return (
        <Paper>
            <Typography variant="h4" component="h1">
                Welcome to the Dashboard
            </Typography>

            <TextField label={"Question"}>
                {question}
            </TextField>

        </Paper>
    )
}

export default Dashboard
