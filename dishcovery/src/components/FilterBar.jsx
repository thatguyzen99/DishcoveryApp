import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext.jsx';

function FilterBar() {
  const { categories, fetchRecipesByCategory, filter, setFilter } =
    useContext(RecipeContext);

  const getButtonClasses = (categoryName) => {
    return `rounded-lg px-4 py-2 whitespace-nowrap ${
      filter === categoryName
        ? 'bg-orange-500 text-white'
        : 'bg-gray-200 text-gray-800'
    } hover:bg-orange-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring focus:ring-orange-300`;
  };

  return (
    <div role="group" aria-label="Recipe Categories" className="flex justify-center space-x-2 mb-6 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.strCategory}
          onClick={() => {
            setFilter(category.strCategory);
            fetchRecipesByCategory(category.strCategory);
          }}
          className={getButtonClasses(category.strCategory)}
          aria-pressed={filter === category.strCategory}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;