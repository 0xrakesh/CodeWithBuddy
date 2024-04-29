import React from 'react';

const Navbar = () => {
    return (
        <div className='flex py-4 bg-violet-300 px-12 justify-between align-middle max-sm:px-4 shadow-md shadow-white/30'>
            <a href="/" className='font-qualy text-xl font-medium' >Code With Buddy</a>
            <ul className='font-qualy flex gap-24 max-sm:flex-col'>
                <li className='max-sm:hidden'>Discord</li>
                <li className='max-sm:hidden'>Developer</li>
                <li className='max-sm:hidden'>About</li>
                <li className='max-sm:visible sm:hidden'>Menu</li>
            </ul>
        </div>
    );
}

export default Navbar;
