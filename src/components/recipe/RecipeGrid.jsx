import React from 'react';
import RecipeCard from './RecipeCard.jsx';

const RecipeGrid = ({ recipes }) => {
    if (recipes.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                Nenhuma receita encontrada.
            </div>
        );
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
            padding: '16px 0'
        }}>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipeGrid;
