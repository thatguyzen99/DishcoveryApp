import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import SearchBar from '../components/SearchBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import RecipeCard from '../components/RecipeCard.jsx';

function Home() {
  const { recipes, loading, error, searchRecipes, filter, setFilter } = useContext(RecipeContext);

  return (
    <div>
      <Navbar />
      <Hero />
      <section className="p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Good Morning, User</h2>
        <SearchBar onSearch={searchRecipes} />
        <FilterBar onFilter={setFilter} activeFilter={filter} />
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <section>
          <h3 className="text-2xl font-bold text-green-700 mb-4">Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;