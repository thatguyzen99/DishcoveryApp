import { useState, useContext, useEffect, useMemo } from 'react'; // Added useEffect, useMemo
import Navbar from '../components/Navbar.jsx';
import { RecipeContext } from '../context/RecipeContext.jsx'; // Use context
import IngredientCard from '../components/IngredientCard.jsx'; // Import IngredientCard
import RecipeCard from '../components/RecipeCard.jsx'; // Import RecipeCard for ideas tab

function MyPantryPage() {
  const [activeTab, setActiveTab] = useState('ingredients'); // 'ingredients' or 'ideas'
  const [recipeIdeas, setRecipeIdeas] = useState([]); // State to hold fetched recipe ideas
  const [ideasLoading, setIdeasLoading] = useState(false); // Loading state for ideas

  // Get pantry state and functions from RecipeContext
  const {
    pantryIngredients,
    // addPantryIngredient, // We'll use this later when implementing the Add UI
    removePantryIngredient,
    clearPantry,
    getRecipeIdeas
  } = useContext(RecipeContext);

  // --- Group Ingredients by Category ---
  const groupedIngredients = useMemo(() => {
    if (!pantryIngredients) return {}; // Handle case where context might initially be undefined
    return pantryIngredients.reduce((acc, ingredient) => {
      const category = ingredient.category || 'Uncategorized'; // Default category
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(ingredient);
      return acc;
    }, {});
  }, [pantryIngredients]); // Recalculate only when pantryIngredients changes

  const ingredientCategories = Object.keys(groupedIngredients).sort(); // Get sorted category names

  // --- Fetch Recipe Ideas when 'ideas' tab is active ---
  useEffect(() => {
    if (activeTab === 'ideas') {
      const fetchIdeas = async () => {
        setIdeasLoading(true);
        try {
          // getRecipeIdeas currently returns placeholder/logs, update when implemented
          const ideas = await getRecipeIdeas();
          setRecipeIdeas(ideas || []); // Ensure it's an array
        } catch (error) {
          console.error("Error fetching recipe ideas:", error);
          setRecipeIdeas([]); // Clear ideas on error
        } finally {
          setIdeasLoading(false);
        }
      };
      fetchIdeas();
    }
  }, [activeTab, getRecipeIdeas]); // Rerun when tab changes or getRecipeIdeas potentially changes

  // --- Button Handlers ---
  const handleAddIngredient = () => {
    // TODO: Implement logic to show a modal or form for adding ingredients
    // This will likely involve setting some state like `setIsAddModalOpen(true)`
    alert('Placeholder: Trigger Add Ingredient Form/Modal Here');
    // When form submits, call: addPantryIngredient({ name: '...', quantity: '...', category: '...', imageUrl: '...' });
  };

  const handleClearPantry = () => {
    if (window.confirm('Are you sure you want to clear your entire pantry? This cannot be undone.')) {
        clearPantry(); // Call clearPantry from context
    }
  };
  // --- End Button Handlers ---


  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      {/* Main content area - Allow scrolling */}
      <main aria-label="My Pantry" className="flex-grow overflow-y-auto bg-beige-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">

        {/* Header section: Title and Clear Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300">
            My Pantry
          </h1>
          {/* Conditionally render Clear Pantry button only if there are ingredients */}
          {pantryIngredients && pantryIngredients.length > 0 && (
             <button
                onClick={handleClearPantry}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors"
             >
                Clear Pantry
             </button>
           )}
        </div>

        {/* Tabs */}
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
              My Ingredients ({pantryIngredients?.length || 0}) {/* Display count */}
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
              Recipe Ideas {/* TODO: Add dynamic count later */}
            </button>
          </nav>
        </div>

        {/* Tab Content Area */}
        <div className="mb-20">
          {/* My Ingredients Tab */}
          {activeTab === 'ingredients' && (
            <div aria-labelledby="tab-ingredients">
              <h2 className="sr-only">My Ingredients</h2>
              {(!pantryIngredients || pantryIngredients.length === 0) ? (
                 <p className="text-center text-gray-500 dark:text-gray-400 p-10">
                     Your pantry is empty. Add some ingredients using the button below!
                 </p>
              ) : (
                <div className="space-y-6">
                  {/* Map over sorted category names */}
                  {ingredientCategories.map(category => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                          {category} ({groupedIngredients[category].length})
                          {/* TODO: Add expand/collapse toggle icon here */}
                      </h3>
                      {/* Grid for ingredients within the category */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                          {groupedIngredients[category].map(ingredient => (
                             <IngredientCard
                                key={ingredient.id}
                                ingredient={ingredient}
                                onRemove={removePantryIngredient} // Pass remove function from context
                             />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Recipe Ideas Tab */}
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
                          // Use RecipeCard if the idea object matches its expected props
                          <RecipeCard key={idea.idMeal} recipe={idea} />
                          // Or render custom idea display if structure is different
                      ))}
                  </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Add Ingredients Button Area */}
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