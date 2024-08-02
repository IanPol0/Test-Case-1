"use client"
import { useState, useEffect, useMemo } from "react";
import SearchInput from "./SearchInput";
import UsersTable from "./UsersTable";
import ColumnSelector from "./ColumnSelector";
import { FaGear } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";

type HomeClientProps = {
  data: any[];
  keys: string[];
  defaultColumns: string[]
};

const HomeClient: React.FC<HomeClientProps> = ({ data, keys, defaultColumns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumns, setActiveColumns] = useState<string[]>(defaultColumns);

  useEffect(() => {
    const storedColumns = localStorage.getItem("activeColumns");
    if (storedColumns) {
      setActiveColumns(JSON.parse(storedColumns));
    } else {
      setActiveColumns(defaultColumns)
    }
  }, [defaultColumns]);

  // useEffect(() => {
  //   if (searchParams && typeof searchParams.search === 'string') {
  //     const searchQuery = searchParams.search.toLowerCase();
  //     const filtered = data.filter((user: any) =>
  //       user.name.toLowerCase().includes(searchQuery)
  //     );
  //     setFilteredData(filtered);
  //   } else {
  //     setFilteredData(data);
  //   }
  // }, [searchParams]);

  const handleSaveColumns = (selectedColumns: string[]) => {
    setActiveColumns(selectedColumns);
    localStorage.setItem("activeColumns", JSON.stringify(selectedColumns));
  };

  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const filteredData = useMemo(() => !search ? data : data.filter((user: any) => user.name.toLowerCase().includes(search)), [search])

  return (
    <main>
      <section className="flex flex-col gap-y-20 py-10 items-center h-screen bg-gradient-to-br from-green-400 to-blue-500 overflow-scroll no-scrollbar">
        <div className="flex items-center gap-5">
          <SearchInput />
          <button
            className="bg-green-400 w-fit h-fit p-3 rounded-lg border-blue-700 border-4 text-2xl text-slate-100"
            onClick={() => setIsModalOpen(true)}
          >
            <FaGear />
          </button>
        </div>
        <UsersTable data={filteredData} keys={keys} activeColumns={activeColumns} />
      </section>
      {isModalOpen && (
        <ColumnSelector
          onSave={handleSaveColumns}
          onClose={() => setIsModalOpen(false)}
          selectedColumns={activeColumns}
        />
      )}
    </main>
  );
};

export default HomeClient;
