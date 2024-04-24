/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { io } from 'socket.io-client';
import { codeValue } from '../hooks/codingValue';
import { outputValue } from '../hooks/outputValue';
import { useRecoilState } from 'recoil';
import NightOwl  from './themes/IDLE.json';


const CodeEditor = () => {
    const [ codes, setCode ] = useRecoilState(codeValue);
    const [output, setOutput] = useRecoilState(outputValue)
    const [transmit, setTransmit] = useState(false);
    const socket = io(`https://${process.env.REACT_APP_SOCKET_URL}`);
    const editorRef = useRef(null);

    const handleCodeInput = (event) => {
        setCode(event)
        if(transmit) {
            socket.emit('send-code',event);
        }
    }

    useEffect(() => {
        socket.on("get-code", (data) => {
            if(transmit)
                setCode(data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket]);

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

    const focusOnMount = (editor, monaco) => {
        editorRef.current = editor
    }

    const handleTransmission = () => {
        setTransmit((prev) => !prev)
    }

    return (
        <Fragment>
            <div className='flex p-5 gap-5 my-5 bg-violet-300 h-fit'>
                <Editor
                    height="50vh"
                    defaultLanguage='python'
                    defaultValue='console.log("Welcome to code with buddy.")'
                    onMount={focusOnMount}
                    theme={NightOwl}
                    value={codes}
                    onChange={handleCodeInput}
                />
                <div className="buttons flex gap-3 flex-col">
                    <button className='bg-white text-black shadow-lg shadow-indigo-500/40 px-4 py-2 rounded-md' onClick={ClearCode}>Clear Code</button>
                    <button className='bg-green-300 shadow-lg text-green-800 shadow-green-400/40 px-4 py-2 rounded-md' onClick={RunCode}>Run Code</button>
                    <button className='bg-primary text-white shadow-lg shadow-violet-400/40 px-4 py-2 rounded-md'>Save a code</button>
                    <button className='bg-purple-500 text-white shadow-lg shadow-purple-400/40 px-4 py-2 rounded-md' onClick={handleTransmission}>{transmit ? "Collab" : "Dev Mode"}</button>
                </div>
            </div>
        </Fragment>
    );
}


export {CodeEditor};
