import React, { Fragment } from 'react';
import Navbar from './components/Navbar';
import './pattern.css'
import SignupForm from './components/SignupFrom';

const Signup = () => {
    return (
        <Fragment>
            <Navbar/>
            <SignupForm/>
        </Fragment>
    );
}

export default Signup;
