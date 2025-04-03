import { XMarkIcon } from '@heroicons/react/24/solid'; 

const getBackgroundColor = (category) => {
    
    switch (category?.toLowerCase()) {
        case 'fruit': return 'bg-red-100 dark:bg-red-900';
        case 'vegetables': return 'bg-green-100 dark:bg-green-900';
        case 'dairy': return 'bg-blue-100 dark:bg-blue-900';
        case 'pantry staples': return 'bg-yellow-100 dark:bg-yellow-900';
        default: return 'bg-gray-100 dark:bg-gray-700';
    }
};

function IngredientCard({ ingredient, onRemove }) {
  
  if (!ingredient) {
    return null;
  }

  
  const imageUrl = ingredient.imageUrl || 'https://via.placeholder.com/100?text=No+Image';
  const bgColor = getBackgroundColor(ingredient.category);

  const handleRemoveClick = (e) => {
      e.preventDefault(); 
      e.stopPropagation(); 
      if (onRemove) {
          onRemove(ingredient.id); 
      }
  };

  return (
    <div
      role="listitem" 
      aria-label={ingredient.name}
      className={`rounded-lg overflow-hidden shadow-sm relative ${bgColor} p-2 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105`}
    >
      {}
      <button
        onClick={handleRemoveClick}
        className="absolute top-1 right-1 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-0.5"
        aria-label={`Remove ${ingredient.name}`}
      >
        <XMarkIcon className="h-3 w-3" />
      </button>

      
      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1"> 
          <img
            src={imageUrl}
            alt={ingredient.name}
            className="w-full h-full object-contain" 
            loading="lazy"
          />
      </div>


      
      <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">
        {ingredient.name}
      </p>
       
    </div>
  );
}

export default IngredientCard;