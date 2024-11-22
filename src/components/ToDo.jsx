import { useSelector, useDispatch } from "react-redux";
import {
  updateToDo,
  toggleComplete,
  removeToDo,
  updatePriority,
  reorderTodos,
} from "../redux/toDoSlice";
import { FaRegCheckCircle, FaPencilAlt, FaGripVertical } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import PriorityColorPicker from "./PriorityColorPicker";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const ToDo = () => {
  const todos = useSelector((state) => state.toDo.todos);
  const filter = useSelector((state) => state.toDo.filter);
  const dispatch = useDispatch();

  const filteredTodos =
    todos && filter
      ? todos.filter((todo) => {
          if (filter === "Pending") return !todo.completed;
          if (filter === "Completed") return todo.completed;
          return true;
        })
      : [];

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    const reorderedTodos = [...todos];
    const [movedItem] = reorderedTodos.splice(oldIndex, 1);
    reorderedTodos.splice(newIndex, 0, movedItem);

    dispatch(reorderTodos(reorderedTodos));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={filteredTodos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="list-none space-y-5">
          {filteredTodos.map((todo) => (
            <SortableItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default ToDo;

const SortableItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateText, setUpdateText] = useState(todo.text);

  const dispatch = useDispatch();

  const updateHandle = (id) => {
    dispatch(updateToDo({ id, newText: updateText }));
    setIsEditing(false);
  };

  const toggleCompleteHandler = (id) => {
    dispatch(toggleComplete({ id }));
  };

  const updatePriorityHandler = (id, priority) => {
    dispatch(updatePriority({ id, priority }));
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      className="flex items-center justify-between px-2 py-2 border-b-2"
      style={{ ...style, borderLeft: `8px solid ${todo.priority}` }}
    >
      {isEditing ? (
        <div className="flex-grow flex items-center space-x-3">
          <input
            className="flex-grow border-b focus:outline-none px-2 py-1 bg-transparent"
            type="text"
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
          />
          <button
            className="p-2 ml-2 rounded-lg hover:bg-green-400 transition-colors"
            onClick={() => updateHandle(todo.id)}
          >
            <FaRegCheckCircle className="text-2xl" />
          </button>
          <button
            className="p-2 ml-2 rounded-lg hover:bg-gray-400 transition-colors"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-3 p-2">
            <div {...attributes} {...listeners} className="cursor-grab p-2">
              <FaGripVertical />
            </div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleteHandler(todo.id)}
              className="appearance-none flex-shrink-0 w-5 h-5 border border-gray-400 rounded-md checked:bg-green-400 checked:border-transparent cursor-pointer checked:after:content-['x'] checked:after:text-white flex items-center justify-center"
            />
            <div
              className={`flex-grow ${todo.completed ? "text-gray-400 " : ""}`}
            >
              {todo.text}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <PriorityColorPicker
              selectedColor={todo.priority}
              onSelect={(color) => updatePriorityHandler(todo.id, color)}
            />
            <div className="flex space-x-2">
              <button
                className="border p-2 rounded-lg hover:bg-yellow-400"
                onClick={() => setIsEditing(true)}
              >
                <FaPencilAlt className="text-2xl" />
              </button>
              <button
                onClick={() => dispatch(removeToDo(todo.id))}
                className="border p-2 rounded-lg hover:bg-red-700"
              >
                <MdDeleteForever className="text-2xl text-gray-700 hover:text-white" />
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
