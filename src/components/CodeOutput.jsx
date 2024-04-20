import React, { useEffect, useState } from 'react';
import { outputValue } from '../hooks/outputValue';
import { useRecoilState } from 'recoil';

const CodeOutput = () => {
    const [output,setOutput] = useRecoilState(outputValue);

    return (
        <div className='h-fit w-full p-4 bg-violet-300'>
            Output
            <div className='bg-white h-32 overflow-auto p-2 rounded-md'>
                {output}
            </div>
        </div>
    );
}

export default CodeOutput;
