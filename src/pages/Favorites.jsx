import React from 'react';
import { useApp } from '../context/AppContext';
import RecipeGrid from '../components/recipe/RecipeGrid';
import { Heart } from 'lucide-react';

const Favorites = () => {
    const { recipes, favorites } = useApp();

    const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

    return (
        <div className="container" style={{ padding: '20px 0 100px' }}>
            <div className="animate-fade" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: 'var(--primary-pink)', borderRadius: '12px', color: 'white' }}>
                    <Heart size={24} fill="white" />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>Minhas Favoritas</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Suas receitas salvas para fácil acesso.</p>
                </div>
            </div>

            <RecipeGrid recipes={favoriteRecipes} />
        </div>
    );
};

export default Favorites;
