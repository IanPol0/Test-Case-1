import getData from "@/lib/getData";
import HomeClient from "./components/HomeClient";

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const data = await getData();
  const keys = Object.keys(data[0]);
  const defaultColumns = ["id", "name", "username", "email", "phone"];
  return <HomeClient data={data} keys={keys} defaultColumns={defaultColumns} searchParams={searchParams}/>;
}
