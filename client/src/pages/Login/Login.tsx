import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, SxProps, TextField, Theme, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login } from '../../redux/slices/UserSlice';
import { close, open } from '../../redux/slices/ToastSlice';
import { useNavigate } from 'react-router-dom';
import { UserLoginResponseSuccess } from 'shared-types';

/**
 * The `Login` component provides a user interface for signing in to the AI Grader account.
 * It features input fields for email and password, form validation, and user feedback on errors.
 * 
 * This component utilizes Material-UI for styling, Redux for state management, and React Router for navigation.
 */
const Login = () => {
    /**
     * State for managing form inputs, errors, and password visibility.
     * 
     * @property {string} email - Stores the user's email input.
     * @property {string} password - Stores the user's password input.
     * @property {boolean} errorInitiated - Indicates if the form has been submitted to trigger error display.
     * @property {boolean} emailError - Indicates if the email validation failed.
     * @property {boolean} passwordError - Indicates if the password validation failed (password length < 8).
     * @property {boolean} showPassword - Toggles the visibility of the password field.
     */
    const [state, setState] = useState({
        email: '',
        password: '',
        errorInitiated: false,
        emailError: false,
        passwordError: false,
        showPassword: false
    });

    // Initialize Redux dispatch and React Router navigation.
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Destructure loading and error states from the Redux store.
    const { loading, error } = useSelector((state: RootState) => state.user);

    /**
     * Custom styling for the input fields to add padding.
     */
    const textFieldStyle: SxProps<Theme> = {
        paddingBottom: '1rem',
    };

    /**
     * Handles changes in the input fields and updates the corresponding state.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
     */
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    /**
     * Toggles the visibility of the password field.
     */
    const handleClickShowPassword = () => {
        setState({
            ...state,
            showPassword: !state.showPassword
        });
    };

    /**
     * Verifies if the provided email has a valid format.
     * 
     * @param {string} email - The email address to validate.
     * @returns {boolean} - Returns `true` if the email is valid, otherwise `false`.
     */
    const verifyEmail = (email: string) => {
        // Regex from https://github.com/manishsaraan/email-validator/blob/df02ecd8f0c53041c53fac986e842df0ec935ebe/index.js#L3
        const emailRegex = /^[-!#$%&'*+\0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        return emailRegex.test(email);
    };

    /**
     * Handles the sign-in button click event.
     * Validates the inputs and dispatches the login action.
     */
    const onSignInClick = () => {
        setState({
            ...state,
            errorInitiated: true,
            emailError: !verifyEmail(state.email),
            passwordError: state.password.length < 8
        });

        // Exit early if there are validation errors.
        if (state.emailError || state.passwordError) {
            return;
        }

        // Dispatch the login action.
        dispatch(login({ email: state.email, password: state.password })).then((res) => {
            if (res.type.includes("rejected")) {
                dispatch(open({
                    message: res.payload as string,
                    variant: 'error'
                }));

                setTimeout(() => {
                    dispatch(close());
                }, 5000);
            } else {
                // Navigate to the dashboard if login is successful.
                if (res.payload && (res.payload as UserLoginResponseSuccess).message === "Login successful") {
                    navigate('/dashboard');
                }
            }
        });
    };

    /**
     * Effect hook to validate the email when the email input changes.
     */
    useEffect(() => {
        setState({
            ...state,
            emailError: !verifyEmail(state.email)
        });
    }, [state.email]);

    /**
     * Effect hook to validate the password length when the password input changes.
     */
    useEffect(() => {
        setState({
            ...state,
            passwordError: state.password.length < 8
        });
    }, [state.password]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Paper sx={{
                padding: '4rem',
                display: 'flex',
                flexDirection: 'column',
                width: '30rem',
            }}>
                <Typography sx={{ textAlign: 'center' }} variant='h4'>Sign In</Typography>
                <Typography variant='body2' sx={{ paddingBottom: '2rem', textAlign: 'center' }}>
                    To access your AI Grader account.
                </Typography>

                <TextField 
                    sx={textFieldStyle} 
                    label='Email' 
                    name='email' 
                    onChange={onInputChange} 
                    value={state.email} 
                    error={state.emailError && state.errorInitiated} 
                />

                <FormControl sx={textFieldStyle} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" error={state.errorInitiated && state.passwordError}>
                        Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={state.showPassword ? 'text' : 'password'}
                        name='password'
                        onChange={onInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={state.showPassword ? 'hide the password' : 'display the password'}
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        error={state.errorInitiated && state.passwordError}
                    />
                </FormControl>

                <Button
                    disabled={state.errorInitiated && (state.emailError || state.passwordError)}
                    variant='outlined' 
                    size='large'
                    onClick={onSignInClick}
                    endIcon={loading ? <CircularProgress size="1rem" /> : null}
                >
                    Sign In
                </Button>
            </Paper>
        </div>
    );
};

export default Login;
