import React from 'react';
import { outputValue } from '../hooks/outputValue';
import { useRecoilState } from 'recoil';

const CodeOutput = () => {
    // eslint-disable-next-line no-unused-vars
    const [output, setOutput] = useRecoilState(outputValue);

    return (
        <div className='h-fit w-full p-4 bg-violet-300'>
            Output
            <pre className='bg-white text-black h-32 overflow-auto p-2 rounded-md'>
                {output}
            </pre>
        </div>
    );
}

export default CodeOutput;
