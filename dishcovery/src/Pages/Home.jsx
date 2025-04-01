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
      <main aria-label="Recipe Search Results" className="p-4 sm:p-8 bg-beige-100 dark:bg-gray-900">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300 mb-4 text-center sm:text-left">
          Good Morning, User
        </h1>
        <SearchBar onSearch={searchRecipes} />
        <FilterBar />
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && recipes.length === 0 && (
          <p className="text-center text-gray-600">
            Search for a recipe to get started!
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;