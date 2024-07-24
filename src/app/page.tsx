import getData from "@/lib/getData";
import SearchInput from "./components/SearchInput";

export default async function Home() {
  const data = await getData();
  const keys = Object.keys(data[0]);

  const handleChange = (event:Event)=>{
    console.log(event)
  }

  return (
    <main>
      <section className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-green-400 to-blue-500">
        <SearchInput/>
        <table className="table-auto border">
          <thead className="bg-green-200 text-black">
            <tr>
              {keys.map((title, index)=>(
                <th key={index} className="border border-blue-400 px-5 py-2">
                  {title}
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
        
      </section>
    </main>
  );
}
