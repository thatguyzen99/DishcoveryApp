import backgroundImage from '../assets/Images/background.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <main aria-label="Hero Section - Discover Recipes" className="bg-beige-100 h-96 flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover opacity-40 bg-[#f5E8D8]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="text-center space-y-4 z-10">
        <h1 className="text-4xl font-bold text-green-700">
          Discover Delicious Recipes
        </h1>
        <p className="text-lg text-gray-600">
          Find meals that match your pantry.
        </p>
        <Link
          to="/Pages/RecipePage" // Correct path to RecipePage.jsx
          aria-label="Start exploring recipes"
          className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 hover:scale-105 transition-transform duration-200"
        >
          Start Cooking Now
        </Link>
      </div>
    </main>
  );
}

export default Hero;