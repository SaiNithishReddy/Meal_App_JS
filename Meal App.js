// JavaSript Codee Here For "Meal App.html"
        const search = document.getElementById('search');
        const searchBtn = document.getElementById('search-btn');
        const mealsEl = document.getElementById('meals');
        const favoritesList = document.getElementById('favorites-list');
        

        // Array to store favorite meals
        let favoriteMeals = [];

        // Function to add a meal to favorites
        function addToFavorites(meal) {
            if (!favoriteMeals.some((favorite) => favorite.idMeal === meal.idMeal)) {
                favoriteMeals.push(meal);
                updateFavoritesDisplay();
            }
        }

        // Function to remove a meal from favorites
        function removeFromFavorites(meal) {
            const index = favoriteMeals.findIndex((favorite) => favorite.idMeal === meal.idMeal);
            if (index !== -1) {
                favoriteMeals.splice(index, 1);
                updateFavoritesDisplay();
            }
        }

        // Function to update the display of favorite meals
        function updateFavoritesDisplay() {
            favoritesList.innerHTML = '';
            favoriteMeals.forEach((meal) => {
                const favoriteItem = document.createElement('div');
                favoriteItem.classList.add('favorite-item');
                favoriteItem.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <button class="btn btn-danger remove-from-favorites">Remove</button>
                `;

                const removeFromFavoritesButton = favoriteItem.querySelector('.remove-from-favorites');
                removeFromFavoritesButton.addEventListener('click', () => {
                    removeFromFavorites(meal);
                });

                favoritesList.appendChild(favoriteItem);
            });
        }

        // Function to search for meals
        async function searchMeal(e) {
            e.preventDefault();
            mealsEl.innerHTML = ''; // Clear previous results
            const term = search.value.trim();
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
            const data = await response.json();
            
            if (data.meals === null) {
                mealsEl.innerHTML = '<p>No results found.</p>';
            } else {
                data.meals.forEach((meal) => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('meal');
                    resultItem.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h4>${meal.strMeal}</h4>
                        <button class="btn btn-primary add-to-favorites">Add to Favorites</button>
                        <br>
                        <a href="meal-page.html?id=${meal.idMeal}" class="meal-link">View Details</a>
                    `;
                    
                    const addToFavoritesButton = resultItem.querySelector('.add-to-favorites');
                    addToFavoritesButton.addEventListener('click', () => {
                        addToFavorites(meal);
                    });

                    mealsEl.appendChild(resultItem);
                });
            }
        }

        searchBtn.addEventListener('click', searchMeal);
        search.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query) {
                searchMeal(e);
            } else {
                mealsEl.innerHTML = '';
            }
        });