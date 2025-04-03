import { Routes, Route } from 'react-router-dom';
import { RecipeProvider } from '@/context/RecipeContext.jsx';
import Home from '@/pages/Home.jsx';
import RecipePage from '@/pages/RecipePage.jsx';
import Favorites from '@/pages/Favorites.jsx';
import ShoppingList from '@/pages/ShoppingList.jsx';
import SignInPage from '@/pages/SignInPage.jsx';

function App() {
  return (
    <RecipeProvider>
      <div className="min-h-screen bg-beige-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </div>
    </RecipeProvider>
  );
}

export default App;