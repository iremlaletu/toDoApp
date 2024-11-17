import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
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
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    updatePriority(state, action) {
      const { id, priority } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, priority } : todo
      );
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
} = toDoSlice.actions;

export default toDoSlice.reducer;
