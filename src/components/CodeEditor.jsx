import React, { Fragment, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { io } from 'socket.io-client';
import { codeValue } from '../hooks/codingValue';
import { outputValue } from '../hooks/outputValue';
import { useRecoilState } from 'recoil';


const CodeEditor = () => {
    const [ codes, setCode ] = useRecoilState(codeValue);
    const [output, setOutput] = useRecoilState(outputValue)
    const [transmit, setTransmit] = useState(false);
    const [width, setWidth] = useState('');
    const socket = io(`wss://${process.env.REACT_APP_SOCKET_URL}`);

    const handleCodeInput = (event) => {
        setCode(event)
        socket.emit("send-code",event)
    }

    useEffect(() => {
        socket.on("get-code", (data) => {
            if(transmit)
                setCode(data)
        })
        return () => socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket]);


    useEffect(() => {
        setWidth(String(window.innerWidth/1.3)+"px");
    },[])


    const ClearCode = () => {
        setCode('')
    }

    const RunCode = () => {
        let url = process.env.REACT_APP_COMPILER_URL;
        let data = {
            language: 'python',
            code:codes,
            input: [[]]
        }
        const fetchOutput = async() => {
            console.log(url)
            const response = await fetch(url+"playground/run",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();

            let tmp = result.output
            console.log(tmp[0])
            if(tmp[0].status === "Compilation error") {
                setOutput(tmp[0].status)
            }
            else {
                tmp = tmp[0].split('\n')
                setOutput(tmp);
            }
        }
        fetchOutput();
    }

    const handleTransmission = () => {
        setTransmit((prev) => !prev)
    }

    return (
        <Fragment>
            <div className='flex p-5 gap-5 bg-violet-300 h-fit'>
                <AceEditor
                    mode={'python'}
                    defaultLanguage="python"
                    theme='vs-dark'
                    highlightActiveLine={true}
                    showPrintMargin={true}
                    value={codes}
                    width={width}
                    onChange={handleCodeInput}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
                <div className="buttons flex gap-3 flex-col">
                    <button className='bg-white shadow-lg shadow-indigo-500/40 px-4 py-2 rounded-md' onClick={ClearCode}>Clear Code</button>
                    <button className='bg-green-300 shadow-lg shadow-green-400/40 px-4 py-2 rounded-md' onClick={RunCode}>Run Code</button>
                    <button className='bg-violet-700 shadow-lg shadow-violet-400/40 px-4 py-2 text-white rounded-md'>Save a code</button>
                    <button className='bg-purple-500 shadow-lg shadow-purple-400/40 px-4 py-2 text-white rounded-md' onClick={handleTransmission}>{transmit ? "Collab" : "Dev Mode"}</button>
                </div>
            </div>
        </Fragment>
    );
}


export {CodeEditor};
