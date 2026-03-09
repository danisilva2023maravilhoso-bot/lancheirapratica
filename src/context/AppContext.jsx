import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load local storage data
        try {
            const savedUser = localStorage.getItem('user');
            const savedFavs = localStorage.getItem('favorites');
            const savedList = localStorage.getItem('shoppingList');

            if (savedUser) setUser(JSON.parse(savedUser));
            if (savedFavs) setFavorites(JSON.parse(savedFavs));
            if (savedList) setShoppingList(JSON.parse(savedList));
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
        }

        // Load recipes from JSON
        import('../data/recipes.json')
            .then((data) => {
                setRecipes(data.default || data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading recipes:', error);
                setLoading(false);
            });
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const toggleFavorite = (recipeId) => {
        setFavorites((prev) => {
            const isFav = prev.includes(recipeId);
            const newList = isFav ? prev.filter(id => id !== recipeId) : [...prev, recipeId];
            localStorage.setItem('favorites', JSON.stringify(newList));
            return newList;
        });
    };

    const addToShoppingList = (item) => {
        setShoppingList((prev) => {
            const newList = [...prev, { id: Date.now(), text: item, bought: false }];
            localStorage.setItem('shoppingList', JSON.stringify(newList));
            return newList;
        });
    };

    const toggleShoppingItem = (id) => {
        setShoppingList((prev) => {
            const newList = prev.map(item => item.id === id ? { ...item, bought: !item.bought } : item);
            localStorage.setItem('shoppingList', JSON.stringify(newList));
            return newList;
        });
    };

    const removeShoppingItem = (id) => {
        setShoppingList((prev) => {
            const newList = prev.filter(item => item.id !== id);
            localStorage.setItem('shoppingList', JSON.stringify(newList));
            return newList;
        });
    };

    const clearShoppingList = () => {
        setShoppingList([]);
        localStorage.removeItem('shoppingList');
    };

    return (
        <AppContext.Provider value={{
            user, login, logout,
            recipes, setRecipes,
            favorites, toggleFavorite,
            shoppingList, addToShoppingList, toggleShoppingItem, removeShoppingItem, clearShoppingList,
            loading
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
