export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("todos");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
};

export const saveToLocalStorage = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to LocalStorage:", error);
  }
};
