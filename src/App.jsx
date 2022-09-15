import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import React from ".";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="clubs" element={<Blank />} />
                    <Route path="pasantias" element={<Blank />} />
                    <Route path="academicas" element={<Blank />} />
                    <Route path="beneficios" element={<Blank />} />
                    <Route path="sobre_nosotros" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
