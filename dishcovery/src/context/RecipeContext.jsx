import { createContext, useState, useEffect, useCallback } from 'react';

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [shoppingList, setShoppingList] = useState(
    JSON.parse(localStorage.getItem('shoppingList')) || []
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Breakfast');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch categories.');
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      setError('Failed to fetch categories. Please check your internet connection.');
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const searchRecipes = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch recipes.');
      }
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError('No recipes found for your search.');
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecipesByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch recipes.');
      }
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError(`No recipes found for category: ${category}`);
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addToFavorites = useCallback((recipe) => {
    if (!favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  }, [favorites]);

  const removeFromFavorites = useCallback((id) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== id));
  }, [favorites]);

  const addToShoppingList = useCallback((ingredient, quantity) => {
    setShoppingList((prev) => {
      const existing = prev.find((item) => item.ingredient === ingredient);
      if (existing) {
        return prev.map((item) =>
          item.ingredient === ingredient
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ingredient, quantity }];
    });
  }, [setShoppingList]);

  const updateShoppingListQuantity = useCallback((ingredient, quantity) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.ingredient === ingredient ? { ...item, quantity } : item
      )
    );
  }, [setShoppingList]);

  const removeFromShoppingList = useCallback((ingredient) => {
    setShoppingList((prev) => prev.filter((item) => item.ingredient !== ingredient));
  }, [setShoppingList]);

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
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}