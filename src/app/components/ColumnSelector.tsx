import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
// @ts-ignore
const SortableItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-2 mb-2 rounded shadow">
      {id}
    </div>
  );
};

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ onSave, onClose, selectedColumns }) => {
  const [selected, setSelected] = useState<string[]>(selectedColumns);
  const [available, setAvailable] = useState<string[]>(columns.filter(column => !selectedColumns.includes(column)));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  );

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    if (available.includes(active.id) && selected.includes(over.id)) {
      setAvailable((items) => items.filter((item) => item !== active.id));
      setSelected((items) => [...items, active.id]);
    } else if (selected.includes(active.id) && available.includes(over.id)) {
      setSelected((items) => items.filter((item) => item !== active.id));
      setAvailable((items) => [...items, active.id]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 text-black">
      <div className="bg-white p-5 rounded w-full max-w-3xl">
        <h2 className="text-lg font-bold mb-4">Select Columns</h2>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="flex space-x-4">
            <SortableContext items={available} strategy={verticalListSortingStrategy}>
              <div className="bg-gray-200 p-2 rounded w-1/2 min-h-[200px]">
                <h3 className="font-bold mb-2">Inactive Columns</h3>
                {available.map((column) => (
                  <SortableItem key={column} id={column} />
                ))}
              </div>
            </SortableContext>

            <SortableContext items={selected} strategy={verticalListSortingStrategy}>
              <div className="bg-gray-200 p-2 rounded w-1/2 min-h-[200px]">
                <h3 className="font-bold mb-2">Active Columns</h3>
                {selected.map((column) => (
                  <SortableItem key={column} id={column} />
                ))}
              </div>
            </SortableContext>
          </div>
        </DndContext>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelector;
