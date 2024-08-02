import { useSensor, useSensors ,PointerSensor } from "@dnd-kit/core";
import { useState } from "react";

const columns = ['username', 'email', 'address', 'phone', 'website', 'company'];

interface Props {
  onSave: (selectedColumns: string[]) => void;
  onClose: () => void;
  selectedColumns: string[];
};

const useColumns = ({onSave, onClose, selectedColumns}: Props) => {
  const [selected, setSelected] = useState<string[]>(selectedColumns);
  const [available, setAvailable] = useState<string[]>(columns.filter(column => !selectedColumns.includes(column)));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    let newAvailable = available;
    let newSelected = selected;

    if (available.includes(active.id)) {
      newAvailable = available.filter((item) => item !== active.id);
      newSelected = [...selected, active.id];
    } else if (selected.includes(active.id)) {
      newSelected = selected.filter((item) => item !== active.id);
      newAvailable = [...available, active.id];
    }

    setAvailable(newAvailable);
    setSelected(newSelected);
  };

  return { sensors, handleSave, handleDragEnd, available, selected };
}

export default useColumns