import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.jsx';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

function RecipeDetails() {
  const { id } = useParams();
  const { addToShoppingList, favorites, addToFavorites, removeFromFavorites } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.meals) {
          setRecipe(data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center">
      <svg
        className="animate-spin h-8 w-8 text-orange-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  return (
    <div className="p-4 sm:p-8 bg-beige-100 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-300">{recipe.strMeal}</h2>
        <button
          onClick={() => isFavorite ? removeFromFavorites(recipe.idMeal) : addToFavorites(recipe)}
          className="hover:scale-110 transition-transform duration-200"
          aria-label={isFavorite ? `Remove ${recipe.strMeal} from favorites` : `Add ${recipe.strMeal} to favorites`}
        >
          {isFavorite ? (
            <HeartIconSolid className="h-8 w-8 text-red-500" />
          ) : (
            <HeartIconOutline className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          )}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-96 object-cover rounded-lg shadow-md" loading="lazy" />
        </div>
        <div className="md:w-1/2">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{recipe.strCategory} • {recipe.strArea}</p>
          <p className="text-base text-gray-800 dark:text-gray-200 mb-4">{recipe.strInstructions.slice(0, 100)}...</p>
          <div className="flex space-x-2 mb-4">
            <button
              className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 hover:scale-105 transition-transform duration-200"
              aria-label="View ingredients"
            >
              Ingredients
            </button>
            <button
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 transition-transform duration-200"
              aria-label="View instructions"
            >
              Instructions
            </button>
          </div>
          <ul className="space-y-2">
            {ingredients.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-green-700 dark:text-green-300 mr-2">✔</span>
                  <span className="text-gray-800 dark:text-gray-200">{item.measure} {item.ingredient}</span>
                </div>
                <button
                  onClick={() => addToShoppingList(item.ingredient, 1)}
                  className="text-orange-500 dark:text-orange-400 hover:underline"
                >
                  Add to Shopping List
                </button>
              </li>
            ))}
          </ul>
          {recipe.strYoutube && (
            <div className="mt-4">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300">Watch Tutorial</h3>
              <iframe
                width="100%"
                height="315"
                src={recipe.strYoutube.replace('watch?v=', 'embed/')}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="mt-4 flex space-x-4">
            {recipe.strSource && (
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 dark:text-orange-400 hover:underline"
              >
                View Full Recipe on TheMealDB
              </a>
            )}
            <a
              href={`https://twitter.com/intent/tweet?text=Check out this recipe for ${recipe.strMeal}!&url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 dark:text-orange-400 hover:underline"
            >
              Share on Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;