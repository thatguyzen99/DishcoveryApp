import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.jsx';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

function RecipeCard({ recipe }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(RecipeContext);
  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    if (isFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div
      role="article"
      
      className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
      
    >
    
      <Link to={`/recipe/${recipe.idMeal}`} className="flex flex-col flex-grow">
        
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            
            className="w-full aspect-video object-cover" 
            loading="lazy"
          />
        </div>

        
        <div className="p-4 flex flex-col flex-grow">
        
          <div className="flex-grow mb-3"> 
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
              {recipe.strMeal}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {recipe.strCategory} • {recipe.strArea}
            </p>
          </div>

          
          <div className="flex justify-end"> 
             <button
               onClick={handleFavoriteClick}
               aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
               className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors" 
             >
               {isFavorite ? (
                 <HeartIconSolid className="h-6 w-6 text-red-500" />
               ) : (
                 <HeartIconOutline className="h-6 w-6 " /> 
               )}
             </button>
           </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;