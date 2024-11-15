import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo(state, action) {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeToDo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateToDo(state, action) {
      const { id, newText } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
    },
    toggleComplete(state, action) {
      const { id } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    },
  },
});

export const { addToDo, removeToDo, updateToDo, toggleComplete } =
  toDoSlice.actions;

export default toDoSlice.reducer;
