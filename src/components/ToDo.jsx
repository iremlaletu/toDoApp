import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToDo, updateToDo, toggleComplete } from "../redux/toDoSlice";
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const ToDo = () => {
  const [update, setUpdate] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.toDo.todos);
  const dispatch = useDispatch();
  const updateHandle = (id) => {
    dispatch(updateToDo({ id, newText: update }));
    setEditId(null);
    setUpdate("");
  };
  const toggleCompleteHandler = (id) => {
    dispatch(toggleComplete({ id }));
  };
  useEffect(() => {
    if (editId) {
      const todo = todos.find((todo) => todo.id === editId);
      if (todo) {
        setUpdate(todo.text);
      }
    }
  }, [editId, todos]);
  return (
    <div>
      <ul className="list-none space-y-4">
        {todos.map((todo) => (
          <li
            className="flex items-center justify-between px-4 py-2 border rounded-lg shadow-sm"
            key={todo.id}
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
                  className="p-2 ml-2 rounded-lg hover:bg-yellow-400 transition-colors"
                  onClick={() => updateHandle(todo.id)}
                >
                  <FaRegCheckCircle className="text-2xl" />
                </button>
              </>
            ) : (
              <>
                <div className={`flex items-center space-x-3`}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompleteHandler(todo.id)}
                    className="cursor-pointer"
                  />
                  <div
                    className={`flex-grow ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
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
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
