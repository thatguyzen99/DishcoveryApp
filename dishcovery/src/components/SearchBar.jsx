import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search by dish name or ingredients (e.g., chicken, rice)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-2 border-gray-600 rounded-lg p-3 w-96 text-gray-800"
      />
      <button type="submit" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg ml-2 hover:bg-orange-600 hover:scale-105 transition-transform duration-200">
        Find Recipes
      </button>
    </form>
  );
}

export default SearchBar;