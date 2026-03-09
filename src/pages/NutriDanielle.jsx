import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import RecipeGrid from '../components/recipe/RecipeGrid';
import { MessageCircle, Sparkles, PlusCircle, Send, User } from 'lucide-react';
import nutriAvatar from '../assets/nutri-danielle.png';

const NutriDanielle = () => {
    const { recipes, setRecipes, user } = useApp();
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [chatHistory, setChatHistory] = useState([
        {
            id: 1,
            type: 'nutri',
            text: `Olá, ${user?.name}! Eu sou a Nutri Danielle. O que você tem hoje na geladeira? Me conte os ingredientes e eu vou sugerir a combinação perfeita para a lancheira!`,
            timestamp: new Date()
        }
    ]);
    const [isGenerating, setIsGenerating] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isGenerating]);

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!ingredientsInput.trim() || isGenerating) return;

        const userMsg = ingredientsInput;
        setIngredientsInput('');

        // Add user message to chat
        setChatHistory(prev => [...prev, {
            id: Date.now(),
            type: 'user',
            text: userMsg,
            timestamp: new Date()
        }]);

        setIsGenerating(true);

        setTimeout(() => {
            const inputIngs = userMsg.toLowerCase().split(',').map(i => i.trim());

            let matches = recipes.filter(r =>
                r.ingredientes.some(ri => inputIngs.some(ii => ri.toLowerCase().includes(ii)))
            );

            if (matches.length === 0) {
                matches = recipes.filter(r =>
                    r.tags.some(t => inputIngs.some(ii => t.toLowerCase().includes(ii)))
                ).slice(0, 2);
            }

            if (matches.length > 0) {
                setChatHistory(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'nutri',
                    text: `Encontrei algumas opções deliciosas com ${userMsg}! O que você acha dessas?`,
                    recipes: matches,
                    timestamp: new Date()
                }]);
            } else {
                setChatHistory(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'nutri',
                    text: `Humm, ainda não tenho uma receita exata com esses ingredientes, mas que tal tentar com outros itens que você tenha?`,
                    timestamp: new Date()
                }]);
            }

            setIsGenerating(false);
        }, 1500);
    };

    const saveGerenatedRecipe = (baseRecipe) => {
        const newRecipe = {
            ...baseRecipe,
            id: Date.now(),
            nome: `${baseRecipe.nome} (Sugerido pela Nutri)`,
            criado_por: 'nutri_danielle',
            data_creation: new Date().toISOString().split('T')[0]
        };
        setRecipes(prev => [...prev, newRecipe]);
        alert('Receita adicionada à sua coleção!');
    };

    return (
        <div className="container" style={{ padding: '20px 0 100px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
            <div className="animate-fade" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid var(--primary-mint)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    <img src={nutriAvatar} alt="Nutri Dani" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', margin: 0 }}>Nutri Dani</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Online</span>
                    </div>
                </div>
            </div>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '4px'
            }}>
                {chatHistory.map(msg => (
                    <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'nutri' ? 'flex-start' : 'flex-end' }}>
                        <div className={`chat-bubble chat-bubble-${msg.type} animate-fade`}>
                            {msg.text}
                        </div>
                        {msg.recipes && (
                            <div style={{ width: '100%', marginTop: '8px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {msg.recipes.map(recipe => (
                                        <div key={recipe.id} style={{ position: 'relative' }}>
                                            <RecipeGrid recipes={[recipe]} />
                                            <button
                                                onClick={() => saveGerenatedRecipe(recipe)}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '24px',
                                                    right: '12px',
                                                    backgroundColor: 'var(--primary-blue)',
                                                    color: 'white',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    boxShadow: '0 4px 12px rgba(160, 231, 229, 0.4)',
                                                    zIndex: 10
                                                }}
                                            >
                                                <PlusCircle size={14} /> Salvar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {isGenerating && (
                    <div style={{ alignSelf: 'flex-start' }} className="chat-bubble chat-bubble-nutri animate-fade">
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <div className="animate-float" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}></div>
                            <div className="animate-float" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animationDelay: '0.2s' }}></div>
                            <div className="animate-float" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleGenerate} style={{
                display: 'flex',
                gap: '10px',
                backgroundColor: '#f8f8f8',
                padding: '12px',
                borderRadius: '24px',
                alignItems: 'center',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.02)'
            }}>
                <input
                    type="text"
                    placeholder="Quais ingredientes você tem?"
                    value={ingredientsInput}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '4px 8px'
                    }}
                />
                <button
                    type="submit"
                    disabled={isGenerating || !ingredientsInput.trim()}
                    style={{
                        backgroundColor: (isGenerating || !ingredientsInput.trim()) ? '#ccc' : 'var(--primary-pink)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s ease'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default NutriDanielle;
