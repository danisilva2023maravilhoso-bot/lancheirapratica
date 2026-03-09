import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Utensils } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

const RecipeCard = ({ recipe }) => {
    const { favorites, toggleFavorite } = useApp();
    const isFavorite = favorites.includes(recipe.id);

    return (
        <div className="card animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
            <button
                onClick={(e) => { e.preventDefault(); toggleFavorite(recipe.id); }}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'white',
                    padding: '6px',
                    borderRadius: '50%',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    color: isFavorite ? 'var(--primary-pink)' : '#ccc'
                }}
            >
                <Heart size={18} fill={isFavorite ? 'var(--primary-pink)' : 'none'} />
            </button>

            <Link to={`/recipe/${recipe.id}`}>
                <img
                    src={recipe.imagem}
                    alt={recipe.nome}
                    style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px' }}
                />
                <div style={{ padding: '8px 0' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-dark)' }}>{recipe.nome}</h3>
                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} /> {recipe.tempo_preparo}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Utensils size={14} /> {recipe.rendimento}
                        </span>
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {recipe.categoria.slice(0, 2).map((cat, idx) => (
                            <span key={idx} style={{
                                backgroundColor: 'var(--primary-blue)',
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '8px',
                                fontSize: '0.7rem'
                            }}>{cat}</span>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RecipeCard;
