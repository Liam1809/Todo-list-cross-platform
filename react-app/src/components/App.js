import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home/Home.js';
import Dashboard from './Dashboard/Dashboard.js';
import Auth from './Auth/Auth.js';
import Snackbar from './Snackbar/Snackbar.js';
import Navbar from './Navbar/Navbar.js';

const App = () => {
    return (
        // Home: /
        // sign in / register: /auth
        <BrowserRouter>
            <Snackbar />
            <Navbar />
            <Container maxWidth={false}>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/auth' exact component={Auth} />
                    <Route path='/dash' exact component={Dashboard} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;