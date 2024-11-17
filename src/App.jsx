import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

function App() {
  return (
    <div className="flex justify-center items-start min-h-screen md:mt-20">
      <div className="bg-neutral-100 shadow-lg rounded-md p-6 w-full max-w-4xl">
        <CreateToDo />
        <ToDo />
      </div>
    </div>
  );
}

export default App;
