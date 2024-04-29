/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { mode } from '../hooks/mode';
import { useNavigate } from 'react-router-dom';

const Box = ({title,image,description, userMode}) => {
    const [ localMode, setUserMode] = useRecoilState(mode);
    let navigate = useNavigate();

    const handleMode = (clickMode) => {
        setUserMode(clickMode)
        if(userMode==='solo'){
            navigate("/coding")
        }
        else if(userMode === "collab") {
            navigate("/coding")
        }
    }

    return (
        <Fragment>
            <div className='w-96 hover:cursor-pointer bg-white/10 py-8 px-6 rounded-md' onClick={() => handleMode(userMode)} >
                <img src={image} alt="" height={300} className='rounded' />
                <h1 className='text-center text-xl py-2  font-bold font-qualy'>{title}</h1>
                <p className="text-center text-white/80 font-helvetica-light">{description}</p>
            </div>
        </Fragment>
    );
}

export default Box;
