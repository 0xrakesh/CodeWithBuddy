import React, { useEffect } from 'react';
import { outputValue } from '../hooks/outputValue';
import { error } from '../hooks/error';
import { useRecoilState } from 'recoil';

const CodeOutput = () => {
    // eslint-disable-next-line no-unused-vars
    const [output, setOutput] = useRecoilState(outputValue);
    const [err,setError] = useRecoilState(error);

    useEffect(() => {
        for(let i in err) {
            console.log(i,err[i])
        }
    },[err])

    console.log(output)
    console.log(err)
    return (
        <div className='h-fit w-full p-4 bg-violet-300'>
            Output
            <pre className='bg-white text-black min:h-32 max:h-48 overflow-auto p-2 rounded-md'>
                {output ? output !== "Compilation error" ?  output?.map((data,index) => (
                    <p key={index}>{data}</p>
                )): 
                <>
                    {output}<br/>
                    {err['stderr']}
                </> :null}
            </pre>
        </div>
    );
}

export default CodeOutput;
