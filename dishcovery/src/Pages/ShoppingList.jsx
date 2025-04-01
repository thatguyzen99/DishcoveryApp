import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext.jsx';
import Navbar from '../components/Navbar.jsx';

function ShoppingList() {
  const { shoppingList, updateShoppingListQuantity, removeFromShoppingList } =
    useContext(RecipeContext);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Navbar />
      <main aria-label="Shopping List" className="p-4 sm:p-8 bg-beige-100 dark:bg-gray-900">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300 mb-4 text-center sm:text-left">
          Shopping List
        </h1>
        {shoppingList.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Your shopping list is empty.
          </p>
        ) : (
          <>
            <ul role="list" className="space-y-2">
              {shoppingList.map((item, index) => (
                <li role="listitem" key={index} className="flex items-center justify-between">
                  <span className="text-gray-800 dark:text-gray-200">
                    {item.ingredient}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        updateShoppingListQuantity(item.ingredient, item.quantity - 1)
                      }
                      className="text-orange-500 dark:text-orange-400 hover:underline"
                      aria-label={`Decrease quantity of ${item.ingredient}`}
                    >
                      -
                    </button>
                    <span className="text-gray-800 dark:text-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateShoppingListQuantity(item.ingredient, item.quantity + 1)
                      }
                      className="text-orange-500 dark:text-orange-400 hover:underline"
                      aria-label={`Increase quantity of ${item.ingredient}`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromShoppingList(item.ingredient)}
                      className="text-red-500 dark:text-red-400 hover:underline"
                      aria-label={`Remove ${item.ingredient} from shopping list`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={handlePrint}
              className="mt-4 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600"
              aria-label="Print shopping list"
            >
              Print Shopping List
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default ShoppingList;