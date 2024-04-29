import React from 'react';
import './index.css'
import { CodeEditor} from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';
import Navbar from './components/Navbar';
import { authentication } from './middleware/auth';

const Coding = () => {
    authentication()
    return (
        <div className='bg-violet-300'>
            <div className=''>
                <Navbar/>
                <CodeEditor/>
                <CodeOutput/>
            </div>
        </div>
    );
}

export default Coding;
