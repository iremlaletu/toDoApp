import ToDo from "./components/ToDo";
import CreateToDo from "./components/createToDo";

function App() {
  return (
    <div className="flex justify-center items-start min-h-screen md:mt-20">
      <div className="bg-neutral-50 shadow-lg rounded-md p-6 w-full max-w-3xl">
        <CreateToDo />
        <ToDo />
      </div>
    </div>
  );
}

export default App;
