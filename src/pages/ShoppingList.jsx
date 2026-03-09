import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Plus, Trash2, CheckCircle, Circle, X } from 'lucide-react';

const ShoppingList = () => {
    const { shoppingList, addToShoppingList, toggleShoppingItem, removeShoppingItem, clearShoppingList } = useApp();
    const [newItem, setNewItem] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (newItem.trim()) {
            addToShoppingList(newItem.trim());
            setNewItem('');
        }
    };

    return (
        <div className="container" style={{ padding: '20px 0 100px' }}>
            <div className="animate-fade" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', backgroundColor: 'var(--primary-blue)', borderRadius: '12px', color: 'white' }}>
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>Lista de Compras</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Organize seus ingredientes.</p>
                    </div>
                </div>
                {shoppingList.length > 0 && (
                    <button onClick={clearShoppingList} style={{ color: '#ff6b6b', background: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: 600 }}>
                        <Trash2 size={16} /> Limpar
                    </button>
                )}
            </div>

            <form onSubmit={handleAdd} className="card" style={{ display: 'flex', gap: '8px', marginBottom: '24px', padding: '12px' }}>
                <input
                    type="text"
                    placeholder="Adicionar item manualmente..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    style={{ flex: 1, border: 'none', outline: 'none', padding: '8px' }}
                />
                <button type="submit" style={{ backgroundColor: 'var(--primary-mint)', color: 'var(--text-dark)', padding: '10px', borderRadius: '10px' }}>
                    <Plus size={20} />
                </button>
            </form>

            {shoppingList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                    <div style={{ marginBottom: '16px', opacity: 0.3 }}>
                        <ShoppingBag size={64} style={{ margin: '0 auto' }} />
                    </div>
                    <p>Sua lista está vazia.</p>
                    <p style={{ fontSize: '0.9rem' }}>Adicione itens manualmente ou direto das receitas!</p>
                </div>
            ) : (
                <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {shoppingList.map(item => (
                        <div key={item.id} className="card" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            backgroundColor: item.bought ? '#f9f9f9' : 'white',
                            opacity: item.bought ? 0.7 : 1,
                            padding: '12px 16px'
                        }}>
                            <button
                                onClick={() => toggleShoppingItem(item.id)}
                                style={{ background: 'none', color: item.bought ? 'var(--primary-mint)' : '#ddd' }}
                            >
                                {item.bought ? <CheckCircle size={24} /> : <Circle size={24} />}
                            </button>
                            <span style={{
                                flex: 1,
                                textDecoration: item.bought ? 'line-through' : 'none',
                                color: item.bought ? 'var(--text-muted)' : 'var(--text-dark)',
                                fontSize: '1rem'
                            }}>
                                {item.text}
                            </span>
                            <button
                                onClick={() => removeShoppingItem(item.id)}
                                style={{ background: 'none', color: '#ff6b6b' }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShoppingList;
