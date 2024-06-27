import React, { useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const App = () => {
    const [cartValue, setCartValue] = useState(0)
    return (
        <div className='wrapper'>
            <Header
                cartValue={cartValue}
            />
            <Outlet />
        </div>
    )
}

export default App
