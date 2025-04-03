import { Routes, Route } from "react-router-dom";
import { RecipeProvider } from "@/context/RecipeContext.jsx";
import Home from "@/Pages/Home.jsx";
import RecipePage from "@/Pages/RecipePage.jsx";
import Favorites from "@/Pages/Favorites.jsx";
import ShoppingList from "@/Pages/ShoppingList.jsx";
import SignInPage from "@/Pages/SignInPage.jsx";
import SignUpPage from "@/Pages/SignUpPage.jsx";
import MyPantryPage from "@/Pages/MyPantryPage.jsx"; 

function App() {
  return (
    <RecipeProvider>
      <div className="min-h-screen bg-beige-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/pantry" element={<MyPantryPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </div>
    </RecipeProvider>
  );
}

export default App;
