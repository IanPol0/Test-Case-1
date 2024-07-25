import getData from "@/lib/getData";
import SearchInput from "./components/SearchInput";
import UsersTable from "./components/UsersTable";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const data = await getData();
  const keys = Object.keys(data[0]);
  var filteredData = data;

  if (searchParams && typeof searchParams.search === 'string') {
    const searchQuery = searchParams.search.toLowerCase(); // Make search case-insensitive
    filteredData = data.filter((user: any) =>
      user.name.toLowerCase().includes(searchQuery)
    )
  }

  return (
    <main>
      <section className="flex flex-col gap-y-20 py-10 items-center h-screen bg-gradient-to-br from-green-400 to-blue-500">
        <SearchInput />
        <UsersTable data={filteredData} keys={keys}/>
      </section>
    </main>
  );
}
