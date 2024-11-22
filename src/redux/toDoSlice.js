import { createSlice, nanoid } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../Hooks/localStorage";

const initialState = {
  todos: loadFromLocalStorage(),
  filter: "All",
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo(state, action) {
      const todo = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority,
      };
      state.todos.push(todo);
      saveToLocalStorage(state.todos);
    },
    removeToDo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(state.todos);
    },
    updateToDo(state, action) {
      const { id, newText } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      saveToLocalStorage(state.todos);
    },
    toggleComplete(state, action) {
      const { id } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveToLocalStorage(state.todos);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      saveToLocalStorage(state.todos);
    },
    updatePriority(state, action) {
      const { id, priority } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, priority } : todo
      );
      saveToLocalStorage(state.todos);
    },
    reorderTodos(state, action) {
      state.todos = action.payload;
      saveToLocalStorage(state.todos);
    },
  },
});

export const {
  addToDo,
  removeToDo,
  updateToDo,
  toggleComplete,
  setFilter,
  updatePriority,
  reorderTodos,
} = toDoSlice.actions;

export default toDoSlice.reducer;
