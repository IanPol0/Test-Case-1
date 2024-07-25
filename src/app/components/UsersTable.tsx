"use client"
import { use, useState } from "react"

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: [Object]
  }
  phone: string;
  website: string;
  company: {
    name:string;
    catchPhrase:string;
    bs:string
  };
};

interface UsersTableProps {
  data: User[];
  keys:string[]
}

const UsersTable : React.FC<UsersTableProps> = ({ data, keys }) => {
  const [order, setOrder]=useState("")
  console.log(order)
  if(!data[0]){
    return(
      <h1>Sorry, No users were found with the name you searched :(</h1>
    )
  }

  return (
    <table className="table-auto border">
          <thead className="bg-green-200 text-black">
            <tr>
              {keys.map((title, index)=>(
                <th key={index} className="border border-blue-400 px-5 py-2">
                  {title === 'username' ? (
                      <button onClick={()=>order=== 'asc' ? setOrder("desc") : setOrder("asc")}>
                          {title} {order === 'asc' ? '▲' : '▼'}
                      </button>
                  ) : (
                      title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((user:any, index:any)=>(
            <tr key={index} className="text-center">
              <td className="border px-5 py-2">{user.id}</td>
              <td className="border px-5 py-2">{user.name}</td>
              <td className="border px-5 py-2">{user.username}</td>
              <td className="border px-5 py-2">{user.email}</td>
              <td className="border px-5 py-2">adress</td>
              <td className="border px-5 py-2">{user.phone}</td>
              <td className="border px-5 py-2">{user.website}</td>
              <td className="border px-5 py-2">company</td>
            </tr>
            ))}
          </tbody>
        </table>
  )
}

export default UsersTable