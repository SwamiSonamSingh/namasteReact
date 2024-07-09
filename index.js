import React, { useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import appStore from './utils/appStore'

const App = () => {
    return (
        <Provider store={appStore}>
            <Header />
            <Outlet />
        </Provider>
    )
}

export default App
