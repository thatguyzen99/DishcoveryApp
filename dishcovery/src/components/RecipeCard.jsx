import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.jsx';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

function RecipeCard({ recipe }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(RecipeContext);
  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div role="article" className="w-72 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
        <div className="p-4">
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {recipe.strMeal}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {recipe.strCategory} • {recipe.strArea}
          </p>
        </div>
      </Link>
      <div className="p-4 flex justify-between">
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <HeartIconSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIconOutline className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;