import { useState } from "react";

const columns = [
  "id",
  "name",
  "username",
  "email",
  "address",
  "phone",
  "website",
  "company"
];

type ColumnSelectorProps = {
  onSave: (selectedColumns: string[]) => void;
  onClose: () => void;
  selectedColumns: string[];
};

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ onSave, onClose, selectedColumns }) => {
  const [selected, setSelected] = useState<string[]>(selectedColumns);

  const handleCheckboxChange = (column: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-5 rounded">
        <h2 className="text-lg font-bold mb-4">Select Columns</h2>
        <div className="grid grid-cols-2 gap-4">
          {columns.map((column) => (
            <label key={column} className="flex items-center">
              <input
                type="checkbox"
                checked={selected.includes(column)}
                onChange={() => handleCheckboxChange(column)}
                className="mr-2"
              />
              {column}
            </label>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelector;
