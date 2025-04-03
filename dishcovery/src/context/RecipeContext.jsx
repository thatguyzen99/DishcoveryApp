import { createContext, useState, useEffect, useCallback } from 'react';

export const RecipeContext = createContext();


const getInitialState = (key, defaultValue) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading localStorage key “${key}”:`, error);
        return defaultValue;
    }
};


export function RecipeProvider({ children }) {
  
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(() => getInitialState('favorites', []));
  const [shoppingList, setShoppingList] = useState(() => getInitialState('shoppingList', []));
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Breakfast'); 
  const [pantryIngredients, setPantryIngredients] = useState(() => getInitialState('pantryIngredients', []));


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('pantryIngredients', JSON.stringify(pantryIngredients));
  }, [pantryIngredients]);
  
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch categories.');
      }
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const searchRecipes = useCallback(async (query) => {
    
    if (!query || query.trim() === '') { 
        setRecipes([]);
        setError(null);
        setLoading(false);
        return;
    }
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}` 
        );
        if (!response.ok) {
            throw new Error('Failed to fetch recipes (Network response not ok).');
        }
        const data = await response.json();
        if (data.meals) {
            setRecipes(data.meals);
        } else {
            setRecipes([]);
           
        }
    } catch (err) {
         console.error("Search recipes error:", err);
        setError('Failed to fetch recipes. Please check your connection or try again.');
        setRecipes([]); 

        setLoading(false);
    }

  }, []); 

  const fetchRecipesByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}` 
      );
      if (!response.ok) {
        throw new Error('Failed to fetch recipes.');
      }
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        
      }
    } catch (err) {
      console.error("Fetch by category error:", err);
      setError('Failed to fetch recipes. Please check your connection or try again.');
       setRecipes([]); 
    } finally {
      setLoading(false);
    }
  }, []);
  


  const addToFavorites = useCallback((recipe) => {
    setFavorites((prev) => {
        if (!prev.some((fav) => fav.idMeal === recipe.idMeal)) {
          return [...prev, recipe];
        }
        return prev;
    });
  }, []);

  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => prev.filter((fav) => fav.idMeal !== id));
  }, []);
  
  const addToShoppingList = useCallback((ingredient, quantity = 1) => {
    setShoppingList((prev) => {
      const ingredientLower = ingredient.trim().toLowerCase();
      if (!ingredientLower) return prev; 
      const existing = prev.find((item) => item.ingredient.toLowerCase() === ingredientLower);
      if (existing) {
        return prev.map((item) =>
          item.ingredient.toLowerCase() === ingredientLower
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ingredient: ingredient.trim(), quantity: Math.max(1, quantity) }];
    });
  }, []);

  const updateShoppingListQuantity = useCallback((ingredient, quantity) => {
     const newQuantity = Math.max(1, quantity); 
    setShoppingList((prev) =>
      prev.map((item) =>
        item.ingredient.toLowerCase() === ingredient.toLowerCase()
         ? { ...item, quantity: newQuantity }
         : item
      )
    );
  }, []);

  const removeFromShoppingList = useCallback((ingredient) => {
    setShoppingList((prev) => prev.filter((item) => item.ingredient.toLowerCase() !== ingredient.toLowerCase()));
  }, []);
  

  const addPantryIngredient = useCallback((ingredientData) => {
    setPantryIngredients((prev) => {
        const newItem = {
            ...ingredientData,
            id: Date.now(),
            name: ingredientData.name.trim(),
        };
        if (!newItem.name) return prev;
        const existing = prev.find(item => item.name.toLowerCase() === newItem.name.toLowerCase());
        if (existing) {
           alert(`${newItem.name} is already in your pantry.`);
           return prev;
        }
        return [...prev, newItem];
    });
  }, []);

  const removePantryIngredient = useCallback((ingredientId) => {
      setPantryIngredients((prev) => prev.filter(item => item.id !== ingredientId));
  }, []);

   const clearPantry = useCallback(() => {
      setPantryIngredients([]);
   }, []);

   const getRecipeIdeas = useCallback(async () => {
       console.log("Getting recipe ideas based on:", pantryIngredients);
       alert("Recipe Ideas feature is not implemented yet.");
       // TODO: This i will Implement real logic using external API or other methods
       return [];
   }, [pantryIngredients]);
 
  const value = {
    recipes,
    setRecipes,
    favorites,
    addToFavorites,
    removeFromFavorites,
    shoppingList,
    addToShoppingList,
    updateShoppingListQuantity,
    removeFromShoppingList,
    categories,
    fetchRecipesByCategory,
    loading,
    error,
    searchRecipes, 
    filter,
    setFilter,
    pantryIngredients,
    addPantryIngredient,
    removePantryIngredient,
    clearPantry,
    getRecipeIdeas,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}