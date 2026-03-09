import React, { useState } from 'react';
import { Search, User, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import RecipeGrid from '../components/recipe/RecipeGrid.jsx';
import logo from '../assets/logo.png';
import nutriAvatar from '../assets/nutri-danielle.png';

const Home = () => {
    const { recipes, user } = useApp();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todas');

    const categories = ['Todas', '🍰 Doces', '🥪 Salgadas', '🧁 Bolinhos', '🥤 Bebidas', '🌾 Sem Glúten', '🥛 Sem Lactose'];

    const filteredRecipes = recipes.filter(r => {
        const matchesSearch = r.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = activeCategory === 'Todas' || r.categoria.includes(activeCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container" style={{ padding: '20px 0 120px' }}>
            <div className="animate-fade" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '32px',
                textAlign: 'center'
            }}>
                <img src={logo} alt="Lancheira Prática" style={{ width: '150px', marginBottom: '16px' }} />
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', fontWeight: 700 }}>Olá, {user?.name}! 👋</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>O que vamos preparar hoje?</p>
            </div>

            <div style={{
                position: 'relative',
                marginBottom: '24px'
            }}>
                <input
                    type="text"
                    placeholder="Buscar receitas ou ingredientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '16px 16px 16px 48px',
                        borderRadius: '20px',
                        border: '1px solid #eee',
                        backgroundColor: 'white',
                        outline: 'none',
                        fontSize: '1rem',
                        boxShadow: 'var(--shadow)'
                    }}
                />
                <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-pink)' }} size={20} />
            </div>

            <div
                className="hide-scrollbar"
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: '12px',
                    padding: '4px 0 16px',
                    marginBottom: '16px',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none'
                }}
            >
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '50px',
                            backgroundColor: activeCategory === cat ? 'var(--primary-pink)' : 'white',
                            color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            border: activeCategory === cat ? 'none' : '1px solid #f0f0f0',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: '32px' }}>
                <div style={{
                    backgroundColor: 'var(--primary-mint)',
                    borderRadius: 'var(--border-radius)',
                    padding: '24px',
                    color: 'var(--text-dark)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    backgroundImage: 'linear-gradient(135deg, #A8E6CF, #4D96FF)',
                    boxShadow: '0 12px 24px rgba(77, 150, 255, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700 }}>Novas Ideias! 🌟</h3>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Confira as receitas fresquinhas da Nutri Danielle.</p>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 700 }}>
                {activeCategory === 'Todas' ? 'Todas as Receitas' : activeCategory}
            </h3>
            <RecipeGrid recipes={filteredRecipes} />

            {/* Floating Nutri Button */}
            <button
                onClick={() => navigate('/nutri-danielle')}
                className="animate-float"
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '25px',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    backgroundColor: 'white',
                    border: '3px solid var(--primary-mint)',
                    boxShadow: '0 10px 30px rgba(168, 230, 207, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    zIndex: 1000,
                    fontWeight: 800,
                    color: 'var(--primary-dark-blue)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                }}
            >
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid var(--primary-mint)'
                }}>
                    <img src={nutriAvatar} alt="Nutri Dani" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span>Nutri Dani</span>
                <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: 'var(--primary-pink)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    border: '2px solid white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    1
                </div>
            </button>
        </div>
    );
};

export default Home;
