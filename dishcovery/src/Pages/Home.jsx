// src/Pages/Home.jsx
import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import SearchBar from '../components/SearchBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

function Home() {
  const { recipes, loading, error, searchRecipes, filter, setFilter } =
    useContext(RecipeContext);

  return (
    <div>
      <Navbar />
      <Hero />
      {/* Ensure main has enough padding */}
      <main aria-label="Recipe Search and Results" className="p-4 sm:p-6 md:p-8 bg-beige-100 dark:bg-gray-900">
        {/* Removed the h1 "Good Morning, User" as it might be redundant with Navbar/Future User state */}
        {/* Or style it differently if needed: */}
        {/* <h1 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300 mb-4 text-center sm:text-left">Good Morning, User</h1> */}

        <SearchBar onSearch={searchRecipes} />
        <FilterBar />

        {/* Loading and Error States */}
        {loading && <p className="text-center text-gray-600 dark:text-gray-400 mt-8">Loading recipes...</p>}
        {error && <p className="text-center text-red-500 mt-8">{error}</p>}

        {/* Grid Container - Render only if not loading, no error, and recipes exist */}
        {!loading && !error && recipes.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {/* Increased gap, added xl cols */}
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}

        {/* No Recipes Found Message - Render only if not loading, no error, and recipes is empty */}
        {!loading && !error && recipes.length === 0 && (
           <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
            Search for a recipe or select a category to get started!
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;