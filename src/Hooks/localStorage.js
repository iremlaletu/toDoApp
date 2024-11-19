export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Error loading todos from LocalStorage:", error);
    return [];
  }
};

export const saveToLocalStorage = (todos) => {
  try {
    const serializedState = JSON.stringify(todos);
    localStorage.setItem("todos", serializedState);
  } catch (error) {
    console.error("Error saving todos to LocalStorage:", error);
  }
};
