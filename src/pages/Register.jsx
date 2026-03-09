import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const { login } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirm) {
            alert('As senhas não coincidem!');
            return;
        }
        if (name && email && password) {
            login({ name, email });
            navigate('/');
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="animate-fade" style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ color: 'var(--primary-pink)', fontSize: '2rem' }}>Criar Conta</h1>
                <p style={{ color: 'var(--text-muted)' }}>Comece a organizar lancheiras incríveis!</p>
            </div>

            <form onSubmit={handleSubmit} className="card animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Nome</label>
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee', outline: 'none' }}
                        required
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>E-mail</label>
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee', outline: 'none' }}
                        required
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Senha</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee', outline: 'none' }}
                        required
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Confirmar Senha</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #eee', outline: 'none' }}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Cadastrar</button>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '8px' }}>
                    Já tem conta? <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Faça Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
