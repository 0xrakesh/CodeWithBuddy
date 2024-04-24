import { atom } from "recoil";

const codeValue = atom({
    key:'codingValue',
    default:'print("Welcome to code with buddy")'
})

export {codeValue};