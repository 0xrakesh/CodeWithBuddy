import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleUserInput = (event) => {
        setEmail(event.target.value);
    }

    const handlePwdInput = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = process.env.REACT_APP_COMPILER_URL;
        const response = await fetch(`${URL}/login`, {
            method: "POST",
            headers : {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                email:email,
                password: password
            })
        });
        let res;
        if(response.status === 404) {
            let tmp = await response.json();
            res = tmp.status;
        }
        else if(response.status  === 401) {
            let tmp = await response.json();
            res = tmp.status;
        }
        else if(response.status  === 200) {
            let tmp = await response.json();
            if(tmp.token) {
                localStorage.setItem("token",tmp.token);
                navigate("/dashboard")
                return;
            }
        }
        alert(res)
    }
    return (
        <div className='bg-white/5 border-[1px] px-8 max-sm:w-[80%] py-24 h-5/6 w-[50%] justify-center absolute rounded-lg bottom-0 right-0 '>
            <p className='text-center text-primary text-3xl text-bold font-helvetica my-4 max-sm:my-2 max-sm:pb-2 pb-8'>Login</p>
            <form className='place-items-center' method='post' onSubmit={handleSubmit}>
                <div className='flex my-[4svh] max-sm:my-[1svh] justify-center'>
                    <input className='bg-violet-300 font-helvetica-light border-[1px] px-4 py-2 rounded w-96' onChange={handleUserInput} value={email} type="email" name="email" id="" placeholder='Enter the email/username'/>
                </div>
                <div className='flex my-[4svh] max-sm:my-[1svh] justify-center'>
                    <input className='bg-violet-300 font-helvetica-light border-[1px] px-4 py-2 rounded w-96' onChange={handlePwdInput}  value={password} type="password" name="password" id="" placeholder='Enter the email/username'/>
                </div>
                <div className="flex my-[4svh] max-sm:my-[1svh] justify-center">
                    <button className='bg-primary text-bold font-helvetica-light px-8 py-3 my-2 rounded-lg text-md' onClick={handleSubmit}>Sign In</button>
                </div>
                <p className='text-center'>OR</p>
                <div className="flex my-[4svh] max-sm:my-[1svh] justify-center">
                    <button type='submit' className='border-[1px] py-3 px-8 my-2 font-helvetica-light rounded-lg'>Continue with Google</button>
                </div>
                <p className='text-center text-xl font-helvetica-light'>If you don't have an accound. <span className='text-primary underline'>Sign Up</span></p>
            </form>
        </div>
    );
}

export default LoginForm;
