import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Save, LogOut, ShieldCheck, Bell, CreditCard, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const Profile = () => {
    const { user, login, logout } = useApp();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '(11) 99999-9999',
        password: '••••••••',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            login({ ...user, ...formData });
            setIsSaving(false);
            setMessage('Perfil atualizado com sucesso! ✨');
            setTimeout(() => setMessage(''), 3000);
        }, 1000);
    };

    return (
        <div className="container" style={{ padding: '20px 0 120px' }}>
            <div className="animate-fade" style={{ marginBottom: '32px', textAlign: 'center' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-mint)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'var(--primary-dark-blue)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    boxShadow: '0 8px 24px rgba(168, 230, 207, 0.4)',
                    border: '4px solid white'
                }}>
                    {formData.name.charAt(0).toUpperCase()}
                </div>
                <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-dark-blue)', fontWeight: 800 }}>Meu Perfil</h1>
                <p style={{ color: 'var(--text-muted)' }}>Gerencie suas informações e sua conta</p>
            </div>

            {message && (
                <div className="animate-fade" style={{
                    padding: '16px',
                    backgroundColor: 'var(--primary-mint)',
                    color: 'var(--primary-dark-blue)',
                    borderRadius: '16px',
                    marginBottom: '24px',
                    fontWeight: 700,
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(168, 230, 207, 0.2)'
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-dark-blue)', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={20} /> Dados Pessoais
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Nome Completo</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1px solid #eee',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    backgroundColor: '#fafafa'
                                }}
                            />
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-dark-blue)' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Telefone / WhatsApp</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1px solid #eee',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    backgroundColor: '#fafafa'
                                }}
                            />
                            <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-dark-blue)' }} />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-dark-blue)', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Lock size={20} /> Acesso & Segurança
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>E-mail</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1px solid #eee',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    backgroundColor: '#fafafa'
                                }}
                            />
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-dark-blue)' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Senha</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1px solid #eee',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    backgroundColor: '#fafafa'
                                }}
                            />
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-dark-blue)' }} />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--primary-dark-blue)', fontWeight: 600, marginTop: '4px', cursor: 'pointer' }}>Alterar senha</p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSaving}
                    style={{
                        padding: '16px',
                        borderRadius: '16px',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        backgroundColor: 'var(--primary-dark-blue)',
                        border: 'none',
                        boxShadow: '0 8px 24px rgba(10, 132, 255, 0.3)'
                    }}
                >
                    <Save size={20} />
                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </form>

            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'var(--text-dark)',
                    fontWeight: 600,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ShieldCheck size={20} color="var(--primary-mint)" />
                        Políticas de Privacidade
                    </div>
                    <ChevronRight size={18} color="#ccc" />
                </button>

                <button onClick={logout} style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #fee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#ff4d4d',
                    fontWeight: 700,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <LogOut size={20} />
                        Sair da Conta
                    </div>
                    <ChevronRight size={18} color="#ffcccc" />
                </button>
            </div>
        </div>
    );
};

export default Profile;
