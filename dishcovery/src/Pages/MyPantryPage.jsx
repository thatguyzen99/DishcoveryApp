import { useState, useContext, useEffect, useMemo } from 'react'; 
import Navbar from '../components/Navbar.jsx';
import { RecipeContext } from '../context/RecipeContext.jsx'; 
import IngredientCard from '../components/IngredientCard.jsx'; 
import RecipeCard from '../components/RecipeCard.jsx'; 

function MyPantryPage() {
  const [activeTab, setActiveTab] = useState('ingredients'); 
  const [recipeIdeas, setRecipeIdeas] = useState([]); 
  const [ideasLoading, setIdeasLoading] = useState(false); 

  
  const {
    pantryIngredients,
    
    removePantryIngredient,
    clearPantry,
    getRecipeIdeas
  } = useContext(RecipeContext);

  
  const groupedIngredients = useMemo(() => {
    if (!pantryIngredients) return {}; 
    return pantryIngredients.reduce((acc, ingredient) => {
      const category = ingredient.category || 'Uncategorized'; 
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(ingredient);
      return acc;
    }, {});
  }, [pantryIngredients]); 

  const ingredientCategories = Object.keys(groupedIngredients).sort(); 

  useEffect(() => {
    if (activeTab === 'ideas') {
      const fetchIdeas = async () => {
        setIdeasLoading(true);
        try {
          
          const ideas = await getRecipeIdeas();
          setRecipeIdeas(ideas || []); 
        } catch (error) {
          console.error("Error fetching recipe ideas:", error);
          setRecipeIdeas([]); 
        } finally {
          setIdeasLoading(false);
        }
      };
      fetchIdeas();
    }
  }, [activeTab, getRecipeIdeas]); 

  const handleAddIngredient = () => {
    
    alert('Placeholder: Trigger Add Ingredient Form/Modal Here');
    
  };

  const handleClearPantry = () => {
    if (window.confirm('Are you sure you want to clear your entire pantry? This cannot be undone.')) {
        clearPantry(); 
    }
  };
  

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      
      <main aria-label="My Pantry" className="flex-grow overflow-y-auto bg-beige-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">

        
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300">
            My Pantry
          </h1>
          
          {pantryIngredients && pantryIngredients.length > 0 && (
             <button
                onClick={handleClearPantry}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors"
             >
                Clear Pantry
             </button>
           )}
        </div>

        
        <div className="mb-4 border-b border-gray-300 dark:border-gray-700">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ingredients'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
              }`}
              aria-current={activeTab === 'ingredients' ? 'page' : undefined}
            >
              My Ingredients ({pantryIngredients?.length || 0}) 
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ideas'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
              }`}
              aria-current={activeTab === 'ideas' ? 'page' : undefined}
            >
              Recipe Ideas {/* TODO: I will Add dynamic count later */}
            </button>
          </nav>
        </div>

        
        <div className="mb-20">
          
          {activeTab === 'ingredients' && (
            <div aria-labelledby="tab-ingredients">
              <h2 className="sr-only">My Ingredients</h2>
              {(!pantryIngredients || pantryIngredients.length === 0) ? (
                 <p className="text-center text-gray-500 dark:text-gray-400 p-10">
                     Your pantry is empty. Add some ingredients using the button below!
                 </p>
              ) : (
                <div className="space-y-6">
                  
                  {ingredientCategories.map(category => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                          {category} ({groupedIngredients[category].length})
                          
                      </h3>
                      
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                          {groupedIngredients[category].map(ingredient => (
                             <IngredientCard
                                key={ingredient.id}
                                ingredient={ingredient}
                                onRemove={removePantryIngredient} 
                             />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          
          {activeTab === 'ideas' && (
            <div aria-labelledby="tab-ideas">
              <h2 className="sr-only">Recipe Ideas</h2>
              {ideasLoading && (
                  <p className="text-center text-gray-500 dark:text-gray-400 p-10">Loading recipe ideas...</p>
              )}
              {!ideasLoading && recipeIdeas.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 p-10">
                      {pantryIngredients?.length > 0 ? "Couldn't find recipe ideas (feature not fully implemented)." : "Add ingredients to your pantry to get recipe ideas!"}
                  </p>
              )}
              {!ideasLoading && recipeIdeas.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                      {recipeIdeas.map(idea => (
                          
                          <RecipeCard key={idea.idMeal} recipe={idea} />
                         
                      ))}
                  </div>
              )}
            </div>
          )}
        </div>
      </main>

      
      <div className="p-4 bg-beige-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
         <button
            onClick={handleAddIngredient}
            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors text-center"
          >
            Add Ingredients
          </button>
      </div>

    </div>
  );
}

export default MyPantryPage;