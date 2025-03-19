function FilterBar({ onFilter, activeFilter }) {
  const categories = ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilter(category)}
          className={`rounded-lg px-4 py-2 ${
            activeFilter === category
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;