import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import ShoppingList from './pages/ShoppingList.jsx';
import NutriDanielle from './pages/NutriDanielle.jsx';
import Organize from './pages/Organize.jsx';
import Profile from './pages/Profile.jsx';
import Checkout from './pages/Checkout.jsx';
import Header from './components/common/Header.jsx';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useApp();
    if (loading) return <div>Carregando...</div>;
    if (!user) return <Navigate to="/login" />;

    return children;
};

function AppRoutes() {
    const { user } = useApp();

    return (
        <Router>
            {user && <Header />}
            <div className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
                    <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                    <Route path="/shopping-list" element={<ProtectedRoute><ShoppingList /></ProtectedRoute>} />
                    <Route path="/nutri-danielle" element={<ProtectedRoute><NutriDanielle /></ProtectedRoute>} />
                    <Route path="/organize" element={<ProtectedRoute><Organize /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    );
}

export default App;
