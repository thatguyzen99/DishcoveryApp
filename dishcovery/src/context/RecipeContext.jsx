// src/context/RecipeContext.jsx
import { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [shoppingList, setShoppingList] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const searchRecipes = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
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
  };

  const fetchRecipesByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
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
  };

  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== id));
  };

  const addToShoppingList = (ingredient, quantity) => {
    setShoppingList((prev) => {
      const existing = prev.find((item) => item.ingredient === ingredient);
      if (existing) {
        return prev.map((item) =>
          item.ingredient === ingredient ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ingredient, quantity }];
    });
  };

  const updateShoppingListQuantity = (ingredient, quantity) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.ingredient === ingredient ? { ...item, quantity } : item))
    );
  };

  const removeFromShoppingList = (ingredient) => {
    setShoppingList((prev) => prev.filter((item) => item.ingredient !== ingredient));
  };

  return (
    <RecipeContext.Provider
      value={{
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
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}