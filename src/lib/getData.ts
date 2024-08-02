"use server"

const getData = async ()=>{
  var data = []
  try{
    const response = await fetch ("https://jsonplaceholder.typicode.com/users",{
      method:"GET"
    })
    data= await response.json()
  }
  catch(error){
    console.error(error)
  }
  return data.map((user: { address: { street: string; suite: string }; company: { name: string } }) => ({
    ...user,
    address: `${user.address.street}, ${user.address.suite}`,
    company: user.company.name,
  }));
}

export default getData;