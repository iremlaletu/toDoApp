const PriorityColorPicker = ({ selectedColor, onSelect }) => {
  const colors = [
    { colorId: 1, name: "red" },
    { colorId: 2, name: "yellow" },
    { colorId: 3, name: "lightblue" },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-gray-500">Priority</h1>
      <div className="space-x-2">
        {colors.map((color) => (
          <button
            key={color.colorId}
            onClick={() => onSelect(color.name)}
            className={`w-6 h-6 rounded-md ${
              color.name === selectedColor ? "ring-2 ring-blue-500" : ""
            }`}
            style={{ backgroundColor: color.name }}
          >
            {color.colorId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriorityColorPicker;
