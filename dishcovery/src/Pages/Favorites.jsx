import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

function Favorites() {
  const { favorites } = useContext(RecipeContext);

  return (
    <div>
      <Navbar />
      <main aria-label="User's Favorite Recipes" className="p-4 sm:p-8 bg-beige-100 dark:bg-gray-900">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300 mb-4 text-center sm:text-left">
          Your Favorites
        </h1>
        {favorites.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No favorites yet. Start adding some!</p>
            <Link to="/" className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600">
              Find Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Favorites;