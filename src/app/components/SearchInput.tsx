"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

const SearchInput =()=>{
  const router = useRouter();
  const [inputValue,  setInputValue] = useState("");
  const handleSearchInputChange = (value: string) => {
    setInputValue(value);
    router.replace(`?search=${value}`);
  };
  return (
    <input className="text-black px-4 py-5 rounded-lg m-5 align-top" value={inputValue} type="text" onChange={(event)=>handleSearchInputChange(event.target.value)}/>
  )
}

export default SearchInput