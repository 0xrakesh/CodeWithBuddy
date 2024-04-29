import React, { Fragment } from 'react';
import Navbar from './components/Navbar';
import './pattern.css'
import LoginForm from './components/LoginForm';

const Home = () => {
    return (
        <Fragment>
            <Navbar/>
            <LoginForm/>
        </Fragment>
    );
}

export default Home;
