import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './components/signIn/SignIn'
import MainLayout from './layout/MainLayout'
import MindGames from './pages/MindGames'
import { useDispatch, useSelector } from 'react-redux'
import GuardedRoute from './routes/GuardedRoute'
import React from ".";


function App() {

    const user = useSelector((state) => state.auth.isAuthenticated)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<GuardedRoute component={SignIn} auth={!user} defroute='/mind' />} />

                    <Route path='mind' element={<GuardedRoute path="mind" component={MindGames} auth={user} defroute='/' />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
