# DishcoveryApp - Recipe Finder

DishcoveryApp is a modern web application designed to help users discover recipes, view details, save favorites, manage a shopping list and pantry, and more. Built with React and Tailwind CSS.

## Live Demo
https://dishcoveryrecipefinderapp.netlify.app/

## Features

* **Search & Filter:** Search recipes by name using TheMealDB API and filter recipes by category.
* **Recipe Details:** View detailed recipe information including ingredients, step-by-step instructions, category, area, and YouTube tutorial links.
* **Favorites:** Save your favorite recipes for quick access. Favorites are stored locally in your browser.
* **Shopping List:** Add ingredients from recipes to a dynamic shopping list. Edit ingredient quantities and remove items. Persists in local storage.
* **My Pantry:** Keep track of ingredients you have on hand.
    * Organize ingredients by category.
    * Add/Remove ingredients (Requires UI implementation for adding).
    * Clear entire pantry.
    * View recipe ideas based on your pantry items (Requires API integration/logic).
* **User Accounts:** Includes basic Sign In and Sign Up pages (Backend integration required for full functionality).
* **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
* **Responsive Design:** Adapts to different screen sizes from mobile to desktop.

## Screenshots
![Homepage Search](https://github.com/user-attachments/assets/2a5d429a-39a5-4095-80bf-961d8ce89084)
![Recipe Details View](https://github.com/user-attachments/assets/8d3eb495-9779-432b-841b-f06ac9ab9856)
![My Pantry Interface](https://github.com/user-attachments/assets/1ed2e192-b906-4c7e-bb23-cf9d81659a00)


## Technology Stack

* **Frontend:** React, Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **State Management:** React Context API
* **Icons:** Heroicons
* **API:** TheMealDB API

## Installation

To run this project locally, follow these steps:

1.  **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed on your system.

2.  **Clone the repository:**
    ```bash
    git clone [https://github.com/thatguyzen99/DishcoveryApp.git](https://github.com/thatguyzen99/DishcoveryApp.git)
    ```

3.  **Navigate into the directory:**
    ```bash
    cd DishcoveryApp
    ```

4.  **Install dependencies:**
    ```bash
    npm install
    # or if using yarn:
    # yarn install
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or if using yarn:
    # yarn dev
    ```
    The application should now be running, typically at `http://localhost:5173` (Vite's default) or another port specified in the output.

## Usage

Once the application is running:

* Use the search bar on the home page to find recipes by name.
* Click on category buttons to filter recipes.
* Click on a recipe card to view its details.
* Use the heart icon on recipe cards or details page to save/remove favorites.
* Navigate using the top navigation bar (includes My Pantry, Favorites, Shopping List links).
* Use the toggle in the navbar to switch between light and dark modes.
* Visit the "My Pantry" page to manage ingredients (Add/Remove functionality needs full implementation).
* Visit the "Shopping List" page to view and manage ingredients added from recipe details.

## License
This project is licensed under the ALX Africa License. See the LICENSE file for details. Just for Fun, Lol.
