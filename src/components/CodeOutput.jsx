import React from 'react';
import { outputValue } from '../hooks/outputValue';
import { useRecoilState } from 'recoil';

const CodeOutput = () => {
    // eslint-disable-next-line no-unused-vars
    const [output, setOutput] = useRecoilState(outputValue);
    return (
        <div className='h-fit w-full p-4 bg-violet-300'>
            Output
            <pre className='bg-white text-black min:h-32 max:h-48 overflow-auto p-2 rounded-md'>
                {output ? output?.map((data,index) => (
                    <p key={index}>{data}</p>
                )): null}
            </pre>
        </div>
    );
}

export default CodeOutput;
