import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

// import actions
import { register, signin } from '../../actions/auth.js';

// import components & Styles
import Input from './Input/Input.js';
import useStyles from './styles.js';

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setisSignUp] = useState(false);
    const [formData, setFormData] = useState({ userName: '', password: '', confirmPassword: '' })
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(register(formData, history));
            setisSignUp(false);
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // toggle to change mode between sign up and sign in form
    const switchMode = () => {
        setisSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    // toggle show password in password text field
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={isSignUp ? classes.avatar1 : classes.avatar2}>
                    <LockIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Input name="userName" label="userName" handleChange={handleChange} type="text" />
                        <Input name="password" label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} type={showPassword ? 'text' : 'password'} />
                        {
                            isSignUp ? (
                                <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} handleShowPassword={handleShowPassword} type='password' />
                            ) : null
                        }
                    </Grid>
                    <Button className={classes.submit} type="submit" fullWidth variant='contained' color={isSignUp ? 'primary' : 'secondary'}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
