import React, { useState } from 'react'
import './header.style.scss'
import logo from './applogo.png'
import { find, get, isEqual, map } from 'lodash'
import { Link } from 'react-router-dom'

const Header = (props) => {
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
        }
    ]
    const { cartValue } = props
    const [label, setLabel] = useState('Login')
    const [tab, setTab] = useState('home')
    const handleButtonClick = (label) => {
        { isEqual(label, "Login") ? setLabel('Log Out') : setLabel('Login') }
    }
    return (
        <div className='header'>
            <img className='header__logo' src={logo} />
            <ul className='header__nav'>
                {map(tabItems, (_tabs, index) => {
                    const tabClassName = get(find(tabItems, { name: tab }), 'name', '') === get(_tabs, 'name', '') ? 'header__nav__items--selected' : 'header__nav__items'
                    return (
                        <li className={tabClassName} key={index} onClick={() => setTab(get(_tabs, 'name', ''))}><Link to={get(_tabs, 'link', '')}>{get(_tabs, 'value', '')}</Link></li>
                    )
                })}
            </ul>
            <div className='header__cart'>
                <span className='header__cart__count'>{cartValue}</span>
                <span className='header__cart__title'>Cart</span>
            </div>
            <button className='header__button'
                onClick={() => handleButtonClick(label)}
            >
                {label}
            </button>
        </div>
    )
}

export default Header
