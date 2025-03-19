// src/pages/Favorites.jsx
import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import Navbar from '../components/Navbar.jsx';

function Favorites() {
  const { favorites } = useContext(RecipeContext);

  return (
    <div>
      <Navbar />
      <section className="p-4 sm:p-8 bg-beige-100 dark:bg-gray-900">
  <h2 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300 mb-4 text-center sm:text-left">
    Your Favorites
  </h2>
  {favorites.length === 0 ? (
    <p className="text-gray-600 dark:text-gray-400 text-center">No favorites yet. Start adding some!</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  )}
</section>
    </div>
  );
}

export default Favorites;