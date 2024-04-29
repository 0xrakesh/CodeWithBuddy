/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import Box from './components/Box';
import { practices } from './contents/dashboard';
import { authentication } from './middleware/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    let navigate = useNavigate();

    useEffect(() => {
        authentication().then((status) => {
            if(status !== "200") {
                navigate("/")
            }
        });
    
    },[])


    return (
        <Fragment>
            <div className='flex gap-10 h-screen justify-center items-center'>
                {
                    practices.map((item,index) => (
                        <Box image={item.image} key={index} title={item.title} description={item.description} userMode={item.mode}/>
                    ))
                }
            </div>
            <p className="text-center w-screen font-helvetica-light absolute bottom-2">Inspired by <span className='text-primary font-helvetica underline'>Solo leveling.</span></p>
        </Fragment>
    );
}

export default Dashboard;
