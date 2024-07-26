"use client"
import { useState } from "react"
import dynamicSort from "@/lib/SortUsers";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import User from "../types/user";

interface UsersTableProps {
  data: User[];
  keys:string[]
  activeColumns:string[]
}

const UsersTable : React.FC<UsersTableProps> = ({ data, keys, activeColumns }) => {
  const [order, setOrder]=useState("")
  
  const formatValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  if (!data[0]) {
    return <h1>Sorry, No users were found with the name you searched 😞</h1>;
  }

  if (order === "asc") {
    data.sort(dynamicSort("username"));
  } else if (order === "desc") {
    data.sort(dynamicSort("-username"));
  }

  return (
    <table className="table-auto border">
      <thead className="bg-green-200 text-black">
        <tr>
          {keys.map((title, index) =>
            activeColumns.includes(title) ? (
              <th key={index} className="border border-blue-400 px-5 py-2">
                {title === "username" ? (
                  <button
                    onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                    className="flex items-center justify-center w-full gap-4"
                  >
                    {title}
                    {order === "asc" ? <FaArrowDownShortWide />: <FaArrowUpShortWide />}
                  </button>
                ) : (
                  title
                )}
              </th>
            ) : null
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={index} className="text-center">
            {keys.map((key, idx) =>
              activeColumns.includes(key) ? (
                <td key={idx} className="border px-5 py-2 ">{formatValue(user[key])}</td>
              ) : null
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

}

export default UsersTable