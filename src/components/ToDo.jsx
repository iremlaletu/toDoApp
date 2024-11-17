import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateToDo,
  toggleComplete,
  removeToDo,
  updatePriority,
} from "../redux/toDoSlice";
import { FaRegCheckCircle, FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Tabs from "./Tabs";
import PriorityColorPicker from "./PriorityColorPicker";

const ToDo = () => {
  const [update, setUpdate] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.toDo.todos);
  const filter = useSelector((state) => state.toDo.filter);
  const dispatch = useDispatch();

  const updateHandle = (id) => {
    dispatch(updateToDo({ id, newText: update }));
    setEditId(null);
    setUpdate("");
  };

  const toggleCompleteHandler = (id) => {
    dispatch(toggleComplete({ id }));
  };

  const updatePriorityHandler = (id, priority) => {
    dispatch(updatePriority({ id, priority }));
  };

  useEffect(() => {
    if (editId) {
      const todo = todos.find((todo) => todo.id === editId);
      if (todo) {
        setUpdate(todo.text);
      }
    }
  }, [editId, todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Pending") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  return (
    <>
      <Tabs />
      <ul className="list-none space-y-5">
        {filteredTodos.map((todo) => (
          <li
            className="flex items-center justify-between px-2 py-2 border-b-2"
            key={todo.id}
            style={{ borderLeft: `8px solid ${todo.priority}` }}
          >
            {editId === todo.id ? (
              <>
                <input
                  className="flex-grow border-b focus:outline-none px-2 py-1 bg-transparent"
                  type="text"
                  value={update}
                  onChange={(e) => setUpdate(e.target.value)}
                />
                <button
                  className="p-2 ml-2 rounded-lg hover:bg-green-400 transition-colors"
                  onClick={() => updateHandle(todo.id)}
                >
                  <FaRegCheckCircle className="text-2xl" />
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompleteHandler(todo.id)}
                    className="appearance-none flex-shrink-0 w-5 h-5 border border-gray-400 rounded-md checked:bg-green-400 checked:border-transparent cursor-pointer checked:after:content-['x'] checked:after:text-white flex items-center justify-center"
                  />
                  <div className={`${todo.completed ? "text-gray-400" : ""} `}>
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
                      onClick={() => setEditId(todo.id)}
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
        ))}
      </ul>
    </>
  );
};

export default ToDo;
