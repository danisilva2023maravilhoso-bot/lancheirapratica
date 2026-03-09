import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Heart, ShoppingBag, MessageCircle, LogOut, ThermometerSnowflake, User } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

import logo from '../../assets/logo.png';

const Header = () => {
    const { logout } = useApp();

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--primary-dark-blue)',
            zIndex: 1000,
            padding: '12px 0 0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 10px' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={logo} alt="Lancheira Prática" style={{
                            width: '32px',
                            height: '32px',
                            objectFit: 'contain',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            padding: '2px'
                        }} />
                        <span style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>Lancheira Prática</span>
                    </Link>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to="/profile" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            padding: '8px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <User size={18} />
                        </Link>
                        <button onClick={logout} style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            padding: '8px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                <nav style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '8px 2px',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <NavLink to="/" style={({ isActive }) => ({
                        color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '6px 2px',
                        borderBottom: isActive ? '3px solid white' : '3px solid transparent'
                    })}>
                        <Home size={18} />
                        <span>Início</span>
                    </NavLink>
                    <NavLink to="/favorites" style={({ isActive }) => ({
                        color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '6px 2px',
                        borderBottom: isActive ? '3px solid white' : '3px solid transparent'
                    })}>
                        <Heart size={18} />
                        <span>Salvos</span>
                    </NavLink>
                    <NavLink to="/organize" style={({ isActive }) => ({
                        color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '6px 2px',
                        borderBottom: isActive ? '3px solid white' : '3px solid transparent'
                    })}>
                        <ThermometerSnowflake size={18} />
                        <span>Dicas</span>
                    </NavLink>
                    <NavLink to="/nutri-danielle" style={({ isActive }) => ({
                        color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '6px 2px',
                        borderBottom: isActive ? '3px solid white' : '3px solid transparent'
                    })}>
                        <MessageCircle size={18} />
                        <span>Nutri</span>
                    </NavLink>
                    <NavLink to="/shopping-list" style={({ isActive }) => ({
                        color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '6px 2px',
                        borderBottom: isActive ? '3px solid white' : '3px solid transparent'
                    })}>
                        <ShoppingBag size={18} />
                        <span>Lista</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
