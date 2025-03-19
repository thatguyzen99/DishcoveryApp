import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.idMeal}`}>
      <div className="w-72 shadow-md rounded-lg overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h4 className="text-lg font-bold text-gray-800">{recipe.strMeal}</h4>
          <p className="text-sm text-gray-600">
            {recipe.strCategory} • {recipe.strArea}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;