/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { codeValue } from '../hooks/codingValue';
import { error } from '../hooks/error';
import { outputValue } from '../hooks/outputValue';
import { useRecoilState } from 'recoil';
import NightOwl  from './themes/IDLE.json';
import { socket } from '../hooks/socket';
import { authentication } from '../middleware/auth';
import { useNavigate } from 'react-router-dom';
import { mode } from '../hooks/mode';

const CodeEditor = () => {
    const [ codes, setCode ] = useRecoilState(codeValue);
    const [ err, setError ] = useRecoilState(error)
    const [output, setOutput] = useRecoilState(outputValue)
    const [userMode,setUserMode] = useRecoilState(mode);
    const [transmit, setTransmit] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [ lang, setLang] = useState('python');
    const [file,setFile] = useState('')

    const editorRef = useRef(null);
    const [copy,setCopy] = useState("Click to copy")
    const [join,setJoin] = useState("Join")
    const navigate = useNavigate();

    const handleCodeInput = (event) => {
        if(transmit) {
            socket.emit('send-code',event,roomName)
        }
        else {
            setCode(event)
        }
    }

    function generateRandomString(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    useEffect(() => {
        authentication().then((status) => {
            if(status === "401") {
                navigate('/')
            }
        });

        if(userMode==="collab") {
            let roomId = generateRandomString(6)
            socket.emit("room-create",roomId)
            setRoomName(roomId)
        }
    },[userMode])

    useEffect(() => {
        socket.connect();
        socket.on('get-room', (data) => {
            alert(data)
        });

        socket.on("get-code",(data) => {
            setCode(data)
        })
    },[])


    const ClearCode = () => {
        setCode('')
    }

    const RunCode = () => {
        let url = process.env.REACT_APP_COMPILER_URL;
        let data = {
            language: lang,
            code:codes,
            input: [[]]
        }
        const fetchOutput = async() => {
            console.log(data);
            const response = await fetch(url+"/playground/run",{
                method:"POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            console.log(result)

            let tmp = result.output
            if(tmp[0]?.status === "Compilation error") {
                setOutput(tmp[0].status)
                setError((tmp[0].error))
            }
            else {
                tmp = tmp[0]?.split('\n')
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

    const handleCopy = async() => {
        await navigator.clipboard.writeText(roomName);
        setCopy("Copied")
    }

    const handleJoin = async() => {
        if(socket)
            socket.emit("join-room",roomName)
        setJoin("Joined")
    }

    const handleRoomInput = (event) => {
        setRoomName(event.target.value)
    }

    const handleKeyboard = (event) => {
        if(event.ctrlKey && event.key === "r") {
            RunCode() 
            event.preventDefault();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => document.removeEventListener('keydown', handleKeyboard);
    })

    const handleSave = async () => {
        let url = process.env.REACT_APP_COMPILER_URL;
        let data = {
            code:codes,
            name:file
        }
        console.log(file)
        if(file.length !==0 && file !== "") {
            let response = await fetch(`${url}/files/save`,{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            });

            try {
                let result = await response.json();
                alert(result.status)
            }
            catch {
                console.log(response);
                alert(response)
            }
        }
        else {
            alert("Enter the file name.")
        }
    }

    const handleFileInput = (event) => {
        setFile(event.target.value);
    }

    // Modal
    const Modal = ({onClose,onCode}) => {

        const [fileNames,setFiles] = useState([]) 

        useEffect(() => {
            const files = async () => {
                let url = process.env.REACT_APP_COMPILER_URL;
                try {
                    let response = await fetch(`${url}/files/get`,{
                        method:"GET",
                        headers: {
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${localStorage.getItem("token")}`
                        }
                    });
    
                    let data = await response.json();
                    setFiles(data.files);
                    console.log(data.files);
    
                }
                catch(err) {
                    alert("Something went wrong")
                }
            }

            files();
        },[])


        const handleCodeOpen = (code) => {
            onCode(code);
            onClose((prev) => !prev)
        }

        return (
            <Fragment>
                <div className='fixed top-24 border-2 border-black z-50 mx-48 text-black w-4/5 bg-violet-300/95 h-96'>
                    <ol className='text-white text-center'>
                        {fileNames ? 
                            fileNames.map((file,index) => (
                                <li className='border-b-[1px] py-4 hover:cursor-pointer' onClick={() => handleCodeOpen(file.code)} key={index}>{file.name}</li>
                            ))
                            :
                            <>Nothing saved</>
                        }
                    </ol>
                    <button className='bg-transparent text-white font-bold absolute right-4 bottom-4' onClick={() => onClose((prev) => !prev)}>Close</button>
                </div>
            </Fragment>
        )
    }

    const [toggle, setToggle] = useState(false)

    return (
        <Fragment>
            <div className='mt-10 flex gap-5 px-5 items-center'>
                <p>Filename</p>
                <input type="text" value={file} placeholder='Enter the filename' onChange={handleFileInput} className='bg-white/20 px-4 py-2 rounded'/>
                {
                        userMode === "collab" ? 
                            <>
                                <div className='bg-white text-black rounded-md px-2 font-bold py-3'>{roomName}</div>
                                <p className='bg-primary/50 rounded-md px-2 text-sm text-center hover:cursor-pointer hover:font-bold py-4' onClick={handleCopy}>{copy}</p>
                            </> : userMode === "join" ?
                            <>
                                <input type='name' placeholder='Room ID' className='w-28 rounded-md px-4 py-2 text-black' onChange={handleRoomInput}/>
                                <button className='bg-green-400 text-black text-center px-4 py-2 rounded-md font-medium' onClick={handleJoin} >{join}</button>
                            </> : <></>
                }
                <button onClick={() => setToggle((prev) => !prev)}>Open a file</button>
                {toggle && <Modal onClose={setToggle} onCode={setCode}/>}
            </div>
            <div className='flex p-5 gap-5 my-5 bg-violet-300 h-fit'>
                <Editor
                    height="50vh"
                    defaultLanguage={lang}
                    defaultValue='console.log("Welcome to code with buddy.")'
                    onMount={focusOnMount}
                    theme={NightOwl}
                    value={codes}
                    onChange={handleCodeInput}
                />
                <div className="buttons flex gap-3 flex-col">
                    <select className='bg-violet-300 border-[1px] rounded-md px-2 py-2 text-white' onChange={(e) => setLang(e.target.value)}>
                        <option value="python">Python</option>
                        <option value="c">C</option>
                        <option value="javascript">Javascript</option>
                    </select>
                    <button className='bg-white text-black shadow-lg shadow-indigo-500/40 px-4 py-2 rounded-md' onClick={ClearCode}>Clear</button>
                    <button className='bg-green-300 shadow-lg text-green-800 shadow-green-400/40 px-4 py-2 rounded-md' onClick={RunCode}>Run Code</button>
                    <button className='bg-teal-400 shadow-lg text-black shadow-teal-400/40 px-4 py-2 rounded-md' onClick={handleSave}>Save</button>
                    
                    { userMode === "solo" || userMode === "" ? 
                        <></> :
                        <button className='bg-purple-500 text-white shadow-lg shadow-purple-400/40 px-4 py-2 rounded-md' onClick={handleTransmission}>{transmit ? "Collab" : "Dev Mode"}</button>
                    }

                </div>
            </div>
        </Fragment>
    );
}


export {CodeEditor};
