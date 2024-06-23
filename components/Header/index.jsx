import React from 'react'
import './header.style.scss'
import logo from './applogo.png'

const Header = (props) => {
    const {cartValue}=props
    return (
        <div className='header'>
            <img className='header__logo' src={logo} />
            <ul className='header__nav'>
                <li className='header__nav__items'>Home</li>
                <li className='header__nav__items'>About Us</li>
                <li className='header__nav__items'>Contact Us</li>
            </ul>
            <div className='header__cart'>
                <span className='header__cart__count'>{ cartValue}</span>
                <span className='header__cart__title'>Cart</span>
            </div>
        </div>
    )
}

export default Header
