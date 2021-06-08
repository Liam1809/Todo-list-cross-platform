import React from 'react';
import { Container, Grow, Typography } from '@material-ui/core';

// import styles/images
import useStyles from './styles.js';
import todolist from '../../image/todolist.png';

const Home = () => {
    const classes = useStyles();
    return (
        <Grow in>
            <Container className={classes.mainContainer}>
                <Typography variant="h4" style={{ padding: '10px 0px 10px 50px' }}>Welcome to Home Page</Typography>
                <img className={classes.icon} src={todolist} alt="icon" />
            </Container>
        </Grow>
    )
}

export default Home;
