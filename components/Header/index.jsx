import React, { useState } from 'react'
import './header.style.scss'
import logo from './applogo.png'
import { find, get, map } from 'lodash'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const tabItems = [
        {
            link: '/',
            name: 'home',
            value: 'Home'
        },
        {
            link: '/about',
            name: 'about',
            value: 'About Us'
        },
        {
            link: '/contactUs',
            name: 'contactUs',
            value: 'Contact Us'
        },
        {
            link: '/grocery',
            name: 'grocery',
            value: 'Grocery'
        },
        {
            link: '/cart',
            name: 'cart',
            value: 'Cart'
        }
    ]
    const [tab, setTab] = useState('home')
    const cartItems = useSelector((store) => store.cart.items)
    return (
        <div className='header'>
            <img className='header__logo' src={logo} />
            <ul className='header__nav'>
                {map(tabItems, (_tabs, index) => {
                    const tabClassName = get(find(tabItems, { name: tab }), 'name', '') === get(_tabs, 'name', '') ? `header__nav__items--${_tabs.name}__selected` : `header__nav__items--${_tabs.name}`
                    if (_tabs.name === 'cart') {
                        return (
                            <li className={tabClassName} onClick={() => setTab(get(_tabs, 'name', ''))}>
                                <Link to={_tabs.link}>
                                    <span className='header__cart__count'>{cartItems.length}</span>
                                    <span className='header__cart__title'>Cart</span>
                                </Link>
                            </li>
                        )
                    }
                    return (
                        <li className={tabClassName} key={index} onClick={() => setTab(get(_tabs, 'name', ''))}><Link to={get(_tabs, 'link', '')}>{get(_tabs, 'value', '')}</Link></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Header
