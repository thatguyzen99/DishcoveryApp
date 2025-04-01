import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); // Notify parent component of clear action
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search by dish name or ingredients (e.g., chicken, rice)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-2 border-gray-600 rounded-lg p-3 w-96 text-gray-800 focus:outline-none focus:ring focus:ring-orange-300"
        aria-label="Search recipes"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg ml-2 hover:bg-orange-600 hover:scale-105 transition-transform duration-200"
        aria-label="Find recipes"
      >
        Find Recipes
      </button>
      {query && (
        <button
          type="button"
          className="ml-2 text-gray-600 hover:text-gray-800"
          onClick={handleClear}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </form>
  );
}

export default SearchBar;