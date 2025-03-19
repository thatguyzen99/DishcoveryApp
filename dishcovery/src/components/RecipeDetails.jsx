import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe) return null;

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-4">{recipe.strMeal}</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-sm text-gray-600 mb-2">{recipe.strCategory} • {recipe.strArea}</p>
          <p className="text-base text-gray-800 mb-4">{recipe.strInstructions.slice(0, 100)}...</p>
          <div className="flex space-x-2 mb-4">
            <button className="bg-orange-500 text-white rounded-lg px-4 py-2">Ingredients</button>
            <button className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">Instructions</button>
          </div>
          <ul className="space-y-2">
            {ingredients.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-700 mr-2">✔</span>
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
          {recipe.strYoutube && (
            <div className="mt-4">
              <h3 className="text-xl font-bold text-green-700">Watch Tutorial</h3>
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
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;