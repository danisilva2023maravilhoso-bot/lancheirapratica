import React, { useState } from 'react';
import {
    ThermometerSnowflake,
    Box,
    Tag,
    LayoutGrid,
    Flame,
    CheckCircle2,
    Calendar,
    ShoppingCart,
    ChefHat,
    Clock,
    Sun,
    Moon,
    ChevronRight,
    ChevronLeft,
    AlertCircle,
    Info
} from 'lucide-react';

const Organize = () => {
    const [activeTab, setActiveTab] = useState('tips'); // tips, guide, planner
    const [plannerSteps, setPlannerSteps] = useState(() => {
        const saved = localStorage.getItem('plannerSteps');
        return saved ? JSON.parse(saved) : {
            'plan_1': false, 'plan_2': false, 'plan_3': false, 'plan_4': false, 'plan_5': false, 'plan_6': false,
            'prod_1': false, 'prod_2': false, 'prod_3': false, 'prod_4': false, 'prod_5': false,
            'freeze_1': false, 'freeze_2': false, 'freeze_3': false, 'freeze_4': false, 'freeze_5': false,
            'night_1': false, 'night_2': false, 'night_3': false,
            'morn_1': false, 'morn_2': false, 'morn_3': false, 'morn_4': false
        };
    });

    const toggleStep = (id) => {
        const newSteps = { ...plannerSteps, [id]: !plannerSteps[id] };
        setPlannerSteps(newSteps);
        localStorage.setItem('plannerSteps', JSON.stringify(newSteps));
    };

    const tabs = [
        { id: 'tips', label: 'Telas de Dicas', icon: <ThermometerSnowflake size={18} /> },
        { id: 'guide', label: 'Guia de Alimentos', icon: <LayoutGrid size={18} /> },
        { id: 'planner', label: 'Planner Semanal', icon: <Calendar size={18} /> },
    ];

    // Sub-tab for Freezing Tips Screens
    const [tipScreen, setTipScreen] = useState(0);
    const freezingTips = [
        {
            title: "Antes de Congelar",
            icon: <ThermometerSnowflake size={48} color="var(--primary-blue)" />,
            items: [
                "Espere o alimento esfriar completamente",
                "Não congele alimentos quentes",
                "Separe em porções individuais"
            ],
            hint: "Dica: já congele na quantidade ideal para 1 lancheira."
        },
        {
            title: "Como Embalar",
            icon: <Box size={48} color="var(--primary-pink)" />,
            items: [
                "Use potes com tampa firme",
                "Use sacos próprios para congelamento",
                "Retire o máximo de ar possível"
            ],
            hint: "Menos ar = menos gelo e melhor conservação.",
            warning: true
        },
        {
            title: "Identificação",
            icon: <Tag size={48} color="var(--primary-yellow)" />,
            items: [
                "Sempre coloque etiqueta",
                "Nome do alimento",
                "Data do preparo"
            ],
            hint: "Organização evita desperdício."
        },
        {
            title: "No Freezer",
            icon: <LayoutGrid size={48} color="var(--primary-mint)" />,
            items: [
                "Alimentos novos atrás",
                "Alimentos antigos na frente",
                "Não sobrecarregue o freezer"
            ],
            hint: "Regra prática: use primeiro o que foi congelado primeiro."
        },
        {
            title: "Como Descongelar",
            icon: <Flame size={48} color="var(--primary-pink)" />,
            items: [
                "Na geladeira de um dia para o outro",
                "Ou na função descongelar do micro-ondas"
            ],
            hint: "Nunca descongele em temperatura ambiente.",
            error: true
        }
    ];

    return (
        <div className="container" style={{ padding: '20px 0 120px' }}>
            <div className="animate-fade" style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-dark-blue)', fontWeight: 800 }}>Organiza & Congele</h1>
                <p style={{ color: 'var(--text-muted)' }}>Mantenha a praticidade a semana toda!</p>
            </div>

            {/* Main Tabs */}
            <div style={{
                display: 'flex',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '4px',
                marginBottom: '24px',
                boxShadow: 'var(--shadow)',
                border: '1px solid #f0f0f0'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1,
                            padding: '12px 10px',
                            borderRadius: '12px',
                            backgroundColor: activeTab === tab.id ? 'var(--primary-dark-blue)' : 'transparent',
                            color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content: Tips (Screens) */}
            {activeTab === 'tips' && (
                <div className="animate-fade">
                    <div className="card" style={{
                        padding: '30px',
                        minHeight: '380px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        backgroundColor: '#fff',
                        border: '2px solid var(--primary-dark-blue)',
                        boxShadow: '0 15px 35px rgba(0, 132, 255, 0.1)'
                    }}>
                        <div style={{ marginBottom: '20px' }}>{freezingTips[tipScreen].icon}</div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary-dark-blue)' }}>
                            {tipScreen + 1}. {freezingTips[tipScreen].title}
                        </h2>

                        <ul style={{ listStyle: 'none', width: '100%', padding: 0, marginBottom: '24px' }}>
                            {freezingTips[tipScreen].items.map((item, i) => (
                                <li key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    justifyContent: 'center',
                                    marginBottom: '12px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: 'var(--text-dark)'
                                }}>
                                    <CheckCircle2 size={18} color="var(--primary-mint)" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div style={{
                            padding: '12px 20px',
                            borderRadius: '14px',
                            backgroundColor: freezingTips[tipScreen].error ? '#ffeeee' : (freezingTips[tipScreen].warning ? '#fff9db' : '#f0f7ff'),
                            color: freezingTips[tipScreen].error ? '#e03131' : (freezingTips[tipScreen].warning ? '#f08c00' : 'var(--primary-blue)'),
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            {freezingTips[tipScreen].error ? <AlertCircle size={18} /> : <Info size={18} />}
                            {freezingTips[tipScreen].hint}
                        </div>

                        {/* Pagination dots */}
                        <div style={{ position: 'absolute', bottom: '20px', display: 'flex', gap: '8px' }}>
                            {freezingTips.map((_, i) => (
                                <div key={i} style={{
                                    width: i === tipScreen ? '24px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    backgroundColor: i === tipScreen ? 'var(--primary-dark-blue)' : '#ddd',
                                    transition: 'all 0.3s'
                                }} />
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                        <button
                            disabled={tipScreen === 0}
                            onClick={() => setTipScreen(s => s - 1)}
                            className="btn"
                            style={{
                                flex: 1,
                                backgroundColor: tipScreen === 0 ? '#eee' : '#fff',
                                border: '2px solid var(--primary-dark-blue)',
                                color: 'var(--primary-dark-blue)',
                                opacity: tipScreen === 0 ? 0.5 : 1
                            }}>
                            <ChevronLeft size={20} /> Ant
                        </button>
                        <button
                            disabled={tipScreen === freezingTips.length - 1}
                            onClick={() => setTipScreen(s => s + 1)}
                            className="btn btn-primary"
                            style={{ flex: 1, backgroundColor: 'var(--primary-dark-blue)', border: 'none' }}>
                            Prox <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Tab Content: Guide (Alimentos) */}
            {activeTab === 'guide' && (
                <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { title: '🍌 Bolinhos Caseiros', info: 'Dura até 3 meses.', howFreeze: ['Espere esfriar', 'Congele inteiros ou cortados', 'Pote ou saquinho'], howUse: ['Retire à noite para a geladeira', 'Ou 30s no micro-ondas'], color: '#fff3b0' },
                        { title: '🧇 Panqueca ou Waffle', info: 'Não grudam com papel.', howFreeze: ['Papel manteiga entre eles', 'Empilhe em saco próprio'], howUse: ['Descongele na geladeira', 'Aqueça na frigideira/tostadeira'], color: '#ffd3b6' },
                        { title: '🍗 Frango Desfiado', info: 'Base para tudo.', howFreeze: ['Separe em pequenas porções', 'Congele já temperado'], howUse: ['Vai direto para recheios', 'Sanduíches ou tortinhas'], color: '#ffecdb' },
                        { title: '🥕 Legumes Cozidos', info: 'Evite congelar crus.', howFreeze: ['Cozinhe até ficar macio', 'Escorra bem a água'], howUse: ['Aqueça no vapor', 'Direto na lancheira'], color: '#e3faf3' },
                        { title: '🥪 Mini Sanduíche', info: 'Pode: Pão+Frango/Carne/Atum.', howFreeze: ['Congele só o recheio', 'Ou o sanduíche pronto sem vegetais'], howUse: ['Não congele alface/tomate/maionese'], color: '#f0f4ff' }
                    ].map((item, idx) => (
                        <div key={idx} className="card" style={{ padding: '20px', borderLeft: `6px solid ${item.color}` }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--primary-dark-blue)' }}>{item.title}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '4px', textTransform: 'uppercase' }}>Como Congelar</div>
                                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem' }}>
                                        {item.howFreeze.map((f, i) => <li key={i}>• {f}</li>)}
                                    </ul>
                                </div>
                                <div style={{ borderLeft: '1px solid #eee', paddingLeft: '12px' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-pink)', marginBottom: '4px', textTransform: 'uppercase' }}>Como Usar</div>
                                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem' }}>
                                        {item.howUse.map((u, i) => <li key={i}>• {u}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Info size={14} /> {item.info}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tab Content: Planner (Checklist) */}
            {activeTab === 'planner' && (
                <div className="animate-fade">
                    <section style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <ShoppingCart size={22} color="var(--primary-blue)" />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark-blue)' }}>Planejamento (Sex/Sáb)</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { id: 'plan_1', text: 'Definir 5 lanches da semana' },
                                { id: 'plan_2', text: 'Conferir o freezer' },
                                { id: 'plan_3', text: 'Anotar lista de compras' },
                                { id: 'plan_4', text: 'Escolher 1 bolinho' },
                                { id: 'plan_5', text: 'Escolher 1 proteína' },
                                { id: 'plan_6', text: 'Escolher 1 opção prática' },
                            ].map(step => (
                                <div key={step.id} onClick={() => toggleStep(step.id)} className="card" style={{
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    border: plannerSteps[step.id] ? '1px solid var(--primary-mint)' : '1px solid transparent',
                                    opacity: plannerSteps[step.id] ? 0.6 : 1,
                                    cursor: 'pointer'
                                }}>
                                    {plannerSteps[step.id] ? <CheckCircle2 color="var(--primary-mint)" /> : <div style={{ width: 24, height: 24, border: '2px solid #ddd', borderRadius: '50%' }} />}
                                    <span style={{ fontSize: '0.95rem', textDecoration: plannerSteps[step.id] ? 'line-through' : 'none' }}>{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <ChefHat size={22} color="var(--primary-pink)" />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-pink)' }}>Produção (Domingo)</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { id: 'prod_1', text: 'Preparar bolinhos' },
                                { id: 'prod_2', text: 'Preparar proteína (Frango/Carne)' },
                                { id: 'prod_3', text: 'Preparar opção prática' },
                                { id: 'prod_4', text: 'Preparar legumes' },
                                { id: 'prod_5', text: 'Esperar esfriar completamente' },
                            ].map(step => (
                                <div key={step.id} onClick={() => toggleStep(step.id)} className="card" style={{
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    border: plannerSteps[step.id] ? '1px solid var(--primary-mint)' : '1px solid transparent',
                                    opacity: plannerSteps[step.id] ? 0.6 : 1,
                                    cursor: 'pointer'
                                }}>
                                    {plannerSteps[step.id] ? <CheckCircle2 color="var(--primary-mint)" /> : <div style={{ width: 24, height: 24, border: '2px solid #ddd', borderRadius: '50%' }} />}
                                    <span style={{ fontSize: '0.95rem', textDecoration: plannerSteps[step.id] ? 'line-through' : 'none' }}>{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <ThermometerSnowflake size={22} color="var(--primary-blue)" />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)' }}>Congelar</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { id: 'freeze_1', text: 'Separar porções individuais' },
                                { id: 'freeze_2', text: 'Colocar em potes ou sacos' },
                                { id: 'freeze_3', text: 'Retirar o máximo de ar' },
                                { id: 'freeze_4', text: 'Etiquetar (Nome e Data)' },
                                { id: 'freeze_5', text: 'Organizar no freezer (Novos atrás)' },
                            ].map(step => (
                                <div key={step.id} onClick={() => toggleStep(step.id)} className="card" style={{
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    border: plannerSteps[step.id] ? '1px solid var(--primary-mint)' : '1px solid transparent',
                                    opacity: plannerSteps[step.id] ? 0.6 : 1,
                                    cursor: 'pointer'
                                }}>
                                    {plannerSteps[step.id] ? <CheckCircle2 color="var(--primary-mint)" /> : <div style={{ width: 24, height: 24, border: '2px solid #ddd', borderRadius: '50%' }} />}
                                    <span style={{ fontSize: '0.95rem', textDecoration: plannerSteps[step.id] ? 'line-through' : 'none' }}>{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <Moon size={22} color="var(--primary-dark-blue)" />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark-blue)' }}>Rotina Noite</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { id: 'night_1', text: 'Escolher o lanche de amanhã' },
                                { id: 'night_2', text: 'Retirar do freezer' },
                                { id: 'night_3', text: 'Colocar na geladeira p/ descongelar' },
                            ].map(step => (
                                <div key={step.id} onClick={() => toggleStep(step.id)} className="card" style={{
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    border: plannerSteps[step.id] ? '1px solid var(--primary-mint)' : '1px solid transparent',
                                    opacity: plannerSteps[step.id] ? 0.6 : 1,
                                    cursor: 'pointer'
                                }}>
                                    {plannerSteps[step.id] ? <CheckCircle2 color="var(--primary-mint)" /> : <div style={{ width: 24, height: 24, border: '2px solid #ddd', borderRadius: '50%' }} />}
                                    <span style={{ fontSize: '0.95rem', textDecoration: plannerSteps[step.id] ? 'line-through' : 'none' }}>{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <Sun size={22} color="var(--primary-yellow)" />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-yellow)' }}>Manhã (5 min)</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { id: 'morn_1', text: 'Montar a lancheira' },
                                { id: 'morn_2', text: 'Aquecer se necessário' },
                                { id: 'morn_3', text: 'Adicionar fruta fresca' },
                                { id: 'morn_4', text: 'Colocar garrafa de água' },
                            ].map(step => (
                                <div key={step.id} onClick={() => toggleStep(step.id)} className="card" style={{
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    border: plannerSteps[step.id] ? '1px solid var(--primary-mint)' : '1px solid transparent',
                                    opacity: plannerSteps[step.id] ? 0.6 : 1,
                                    cursor: 'pointer'
                                }}>
                                    {plannerSteps[step.id] ? <CheckCircle2 color="var(--primary-mint)" /> : <div style={{ width: 24, height: 24, border: '2px solid #ddd', borderRadius: '50%' }} />}
                                    <span style={{ fontSize: '0.95rem', textDecoration: plannerSteps[step.id] ? 'line-through' : 'none' }}>{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div style={{
                        padding: '24px',
                        backgroundColor: 'var(--primary-mint)',
                        borderRadius: '24px',
                        textAlign: 'center',
                        color: 'var(--primary-dark-blue)',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 32px rgba(168, 230, 207, 0.4)'
                    }}>
                        “Pequena organização no domingo = manhãs mais leves a semana inteira.” 💛
                    </div>
                </div>
            )}
        </div>
    );
};

export default Organize;
