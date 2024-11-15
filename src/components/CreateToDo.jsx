import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../redux/toDoSlice";

const CreateToDo = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addToDo(input));
    setInput("");
  };

  return (
    <>
      <h1 className="text-xl mb-5"> Create Your List...</h1>
      <form
        onSubmit={addTodoHandler}
        className="flex mb-4 gap-2 w-full max-w-3xl"
      >
        <input
          type="text"
          placeholder="Enter a to-do.."
          className="flex-1 py-2 px-3 border border-gray-400 focus:ring-1 focus:ring-gray-700 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <button
          type="submit"
          className="relative w-36 h-11 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
        >
          <span className="text-gray-400 font-semibold ml-2 md:ml-6 transform transition-all duration-300 group-hover:hidden">
            Add Item
          </span>

          <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
            <svg
              className="svg w-8 text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </span>
        </button>
      </form>
    </>
  );
};

export default CreateToDo;
