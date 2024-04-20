import { atom } from "recoil";

const codeValue = atom({
    key:'codingValue',
    default:'print("hello world")'
})

export {codeValue};