import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] = useState('');
    const [user, setUser] = useState('');


    const navigate = useNavigate()

    const handleNameInput = (event) => {
        setName(event.target.value);
    }
    
    const handleUsernameInput = (event) => {
        setUser(event.target.value);
    }

    const handleUserInput = (event) => {
        setEmail(event.target.value);
    }

    const handlePwdInput = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = process.env.REACT_APP_COMPILER_URL;
        const response = await fetch(`${URL}/register`, {
            method: "POST",
            headers : {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                name:name,
                username:user,
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
            navigate("/login")
            return;

        }
        alert(res)
    }
    return (
        <div className='bg-white/5 border-[1px] px-8 max-sm:w-[80%] py-24 w-[50%] justify-center absolute rounded-lg bottom-0 right-0 '>
            <p className='text-center text-primary text-3xl text-bold font-helvetica my-4 max-sm:my-2 max-sm:pb-2 pb-8'>Sign Up</p>
            <form className='place-items-center' method='post' onSubmit={handleSubmit}>
                <div className='flex my-[4svh] max-sm:my-[1svh] justify-center'>
                    <input className='bg-violet-300 font-helvetica-light border-[1px] px-4 py-2 rounded w-96' onChange={handleNameInput} value={name} type="name" name="name" id="" placeholder='Enter the name'/>
                </div>
                <div className='flex my-[4svh] max-sm:my-[1svh] justify-center'>
                    <input className='bg-violet-300 font-helvetica-light border-[1px] px-4 py-2 rounded w-96' onChange={handleUsernameInput} value={user} type="name" name="username" id="" placeholder='Enter the username'/>
                </div>
                <div className='flex my-[4svh] max-sm:my-[1svh] justify-center'>
                    <input className='bg-violet-300 font-helvetica-light border-[1px] px-4 py-2 rounded w-96' onChange={handleUserInput} value={email} type="email" name="email" id="" placeholder='Enter the email'/>
                </div>
                <div className='flex my-[4svh] max-sm:my-[1svh] justify-center'>
                    <input className='bg-violet-300 font-helvetica-light border-[1px] px-4 py-2 rounded w-96' onChange={handlePwdInput}  value={password} type="password" name="password" id="" placeholder='Enter the password'/>
                </div>
                <div className="flex my-[4svh] max-sm:my-[1svh] justify-center">
                    <button className='bg-primary text-bold font-helvetica-light px-8 py-3 my-2 rounded-lg text-md' onClick={handleSubmit}>Sign Up</button>
                </div>
                <p className='text-center text-xl font-helvetica-light'>If you have an account. <span className='text-primary underline hover:cursor-pointer' onClick={() => navigate("/login")}>Sign in</span></p>
            </form>
        </div>
    );
}

export default SignupForm;
