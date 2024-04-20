import React from 'react';
import './index.css'
import { CodeEditor} from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';

const Coding = () => {
    return (
        <div className='bg-violet-300'>
            <div className=''>
                <CodeEditor/>
                <CodeOutput/>
            </div>
        </div>
    );
}

export default Coding;
