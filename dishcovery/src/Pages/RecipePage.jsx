import Navbar from '../components/Navbar.jsx';
import RecipeDetails from '../components/RecipeDetails.jsx';

function RecipePage() {
  return (
    <div>
      <Navbar />
      <main aria-label="Recipe Details">
        <h1 className="sr-only">Recipe Details</h1> {/* Added for screen readers */}
        <RecipeDetails />
      </main>
    </div>
  );
}

export default RecipePage;