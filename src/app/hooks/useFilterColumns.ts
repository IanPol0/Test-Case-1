import { useEffect, useState } from "react";

const useFilterColumns =(storedColumns:string)=>{
  useEffect(() => {

    console.log(storedColumns)
    if (storedColumns) {
      return (JSON.parse(storedColumns));
    }else{
      setActiveColumns(defaultColumns)
    }
  }, [defaultColumns]);
}

export default useFilterColumns