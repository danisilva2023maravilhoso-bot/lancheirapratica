import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Clock, Utensils, Star, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { recipes, favorites, toggleFavorite, addToShoppingList } = useApp();

    const recipe = recipes.find(r => r.id === parseInt(id));
    const isFavorite = favorites.includes(recipe?.id);

    if (!recipe) return <div className="container">Receita não encontrada.</div>;

    const handleAddAllToShoppingList = () => {
        recipe.ingredientes.forEach(ing => addToShoppingList(ing));
        alert('Ingredientes adicionados à lista!');
    };

    return (
        <div className="container" style={{ padding: '0 0 100px' }}>
            <div style={{ position: 'relative', height: '280px' }}>
                <img
                    src={recipe.imagem}
                    alt={recipe.nome}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => toggleFavorite(recipe.id)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        backgroundColor: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isFavorite ? 'var(--primary-pink)' : '#ccc'
                    }}
                >
                    <Heart size={24} fill={isFavorite ? 'var(--primary-pink)' : 'none'} />
                </button>
            </div>

            <div style={{
                marginTop: '-30px',
                backgroundColor: 'white',
                borderRadius: '30px 30px 0 0',
                padding: '30px 20px',
                position: 'relative',
                zIndex: 10
            }}>
                <h1 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '8px' }}>{recipe.nome}</h1>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {recipe.tags.map(tag => (
                        <span key={tag} style={{ backgroundColor: '#f0f0f0', color: 'var(--text-muted)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem' }}>
                            #{tag}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Clock size={20} color="var(--primary-pink)" style={{ marginBottom: '4px' }} />
                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{recipe.tempo_preparo}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Preparo</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Utensils size={20} color="var(--primary-blue)" style={{ marginBottom: '4px' }} />
                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{recipe.rendimento}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rendimento</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Star size={20} color="var(--primary-yellow)" style={{ marginBottom: '4px' }} />
                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{recipe.nivel_dificuldade}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nível</div>
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '1.2rem' }}>Ingredientes</h3>
                        <button
                            onClick={handleAddAllToShoppingList}
                            style={{ color: 'var(--primary-pink)', fontSize: '0.9rem', fontWeight: 600, background: 'none' }}
                        >
                            <Plus size={16} /> Tudo na lista
                        </button>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recipe.ingredientes.map((ing, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary-mint)', borderRadius: '50%' }}></div>
                                <span>{ing}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Modo de Preparo</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {recipe.modo_preparo.map((passo, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                                <div style={{
                                    flexShrink: 0,
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: 'var(--primary-pink)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700
                                }}>
                                    {idx + 1}
                                </div>
                                <p style={{ color: 'var(--text-dark)', fontSize: '1rem' }}>{passo}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
