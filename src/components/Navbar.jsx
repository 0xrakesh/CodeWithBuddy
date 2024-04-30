import React from 'react';

const Navbar = () => {
    return (
        <div className='flex py-4 bg-violet-300 px-12 justify-between align-middle max-sm:px-4 shadow-md shadow-white/30'>
            <a href="/" className='font-qualy text-xl font-medium' >Code With Buddy</a>
            <ul className='font-qualy flex gap-24 max-sm:flex-col'>
                <li className='max-sm:hidden hover:cursor-pointer'><a target='blank' href='https://discord.gg/FWB7E5eD'>Discord</a></li>
                <li className='max-sm:hidden hover:cursor-pointer'><a target='blank' href='https://www.instagram.com/0xrakesh.developer'>Developer</a></li>
                <li className='max-sm:hidden hover:cursor-pointer'><a target='blank' href='https://www.github.com/0xrakesh'>About</a></li>
                <li className='max-sm:hidden sm:hidden'>Menu</li>
            </ul>
        </div>
    );
}

export default Navbar;
