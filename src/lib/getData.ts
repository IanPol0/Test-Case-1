"use server"
const getData = async ()=>{
  try{
    const response = await fetch ("https://jsonplaceholder.typicode.com/users",{
      method:"GET"
    })
    const data= await response.json()

    return data
  }
  catch(error){
    console.error(error)
  }
}

export default getData;