import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CreditCard, CheckCircle2, Lock, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import logo from '../assets/logo.png';
import loginHero from '../assets/login_hero.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            // Since this is for people who already bought, we grant VIP access immediately
            login({
                name: email.split('@')[0],
                email
            });
            navigate('/');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-white)',
            position: 'relative'
        }}>
            {/* Logo e Título no Topo */}
            <div style={{
                padding: '40px 20px 20px',
                textAlign: 'center',
                backgroundColor: 'var(--primary-dark-blue)',
                borderRadius: '0 0 30px 30px',
                marginBottom: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '12px', filter: 'brightness(1.2)' }} />
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: 0 }}>Entrar no Aplicativo</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginTop: '5px' }}>Bem-vinda de volta, Mamãe!</p>
            </div>

            <div className="container" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '0 20px 40px'
            }}>
                {/* Formulário de Login - Agora no Topo */}
                <form onSubmit={handleSubmit} className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>E-mail de Acesso</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: '16px',
                                borderRadius: '16px',
                                border: '1px solid #eee',
                                outline: 'none',
                                backgroundColor: 'var(--bg-light)',
                                fontSize: '1rem',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                            }}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>Senha</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: '16px',
                                borderRadius: '16px',
                                border: '1px solid #eee',
                                outline: 'none',
                                backgroundColor: 'var(--bg-light)',
                                fontSize: '1rem',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                            }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{
                        marginTop: '10px',
                        padding: '18px',
                        borderRadius: '18px',
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        backgroundColor: 'var(--primary-dark-blue)',
                        border: 'none',
                        boxShadow: '0 8px 25px rgba(10, 132, 255, 0.3)'
                    }}>ACESSAR AGORA</button>

                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Esqueceu sua senha? <span style={{ color: 'var(--primary-dark-blue)', fontWeight: 600, cursor: 'pointer' }}>Recuperar</span>
                    </p>
                </form>

                {/* Seção Visual / Hero (Movida para baixo do form) */}
                <div style={{
                    height: '250px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    marginBottom: '40px'
                }}>
                    <img src={loginHero} alt="Lancheira" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '20px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                        color: 'white'
                    }}>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem' }}>Lanches Saudáveis e Práticos</p>
                        <p style={{ margin: 0, opacity: 0.9, fontSize: '0.85rem' }}>Feito com amor para o seu filho.</p>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '20px', padding: '20px', backgroundColor: '#fafafa', borderRadius: '16px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Não tem uma conta? <Link to="/register" style={{ color: 'var(--primary-dark-blue)', fontWeight: 600 }}>Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
