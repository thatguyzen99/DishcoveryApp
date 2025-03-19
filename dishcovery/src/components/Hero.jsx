import backgroundImage from '../assets/Images/backgound.jpg';

function Hero() {
  return (
    <section className="bg-beige-100 h-96 flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover opacity-40"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="text-center space-y-4 z-10">
        <h1 className="text-4xl font-bold text-green-700">Discover Delicious Recipes</h1>
        <p className="text-lg text-gray-600">Find meals that match your pantry.</p>
        <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 hover:scale-105 transition-transform duration-200">
          Start Cooking Now
        </button>
      </div>
    </section>
  );
}

export default Hero;
