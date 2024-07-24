"use client"
import { useState } from "react"

const SearchInput =()=>{
  const [inputValue,  setInputValue] = useState("");
  console.log(inputValue);
  return (
    <input className="text-black px-4 py-5 rounded-lg m-5" value={inputValue} type="text" onChange={(event)=>setInputValue(event.target.value)}/>
  )
}

export default SearchInput