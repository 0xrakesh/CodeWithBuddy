/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';
import Box from './components/Box';
import Theme from "./assets/solo leveling logo.png"
import { practices,professional } from './contents/dashboard';
import { authentication } from './middleware/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const Dashboard = () => {
    let navigate = useNavigate();
    const [theme,setTheme] = useState(false);

    useEffect(() => {
        authentication().then((status) => {
            if(status !== "200") {
                navigate("/")
            }
        });
    
    },[])

    const handleTheme = () => {
        setTheme((prev) => !prev)
    } 

    return (
        <Fragment>
            <Navbar/>
            <div className='absolute right-12 top-24 hover:scale-110 hover:transition-transform hover:bg-white/10 px-4 py-2  hover:cursor-pointer rounded' onClick={handleTheme}>
                <div className='flex justify-center align-middle items-center gap-2'>
                    <img src={Theme} width={"50px"} alt="" className='rounded-full' />
                    Theme
                </div>
            </div>
            <div className='flex gap-10 h-[90svh] justify-center items-center max-sm:flex-wrap max-sm:my-32 max-sm:mx-12 max-sm:justify-evenly'>
                {
                    theme ?
                        practices.map((item,index) => (
                            <Box image={item.image} key={index} title={item.title} description={item.description} userMode={item.mode}/>
                        ))
                    : 
                        professional.map((item,index) => (
                            <Box image={item.image} key={index} title={item.title} description={item.description} userMode={item.mode}/>
                        ))
                }
            </div>
            <p className="text-center w-screen font-helvetica-light absolute bottom-2 max-sm:hidden">Inspired by <span className='text-primary font-helvetica underline'>Solo leveling.</span></p>
        </Fragment>
    );
}

export default Dashboard;
