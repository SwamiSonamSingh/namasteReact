import React from 'react'
import './about.style.scss'
import CheckOnlineStatus from '../../utils/checkOnlineStatus';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
        }
        console.log('constructor called');
    } 
    componentDidUpdate() {
        console.log('component updated');
    }
    componentWillUnmount() {
        console.log('component unmounted');
    }
    async componentDidMount() {
        console.log('component did mount called');
        const data = await fetch('https://api.github.com/users/SwamiSonamSingh');
        const userInfo = await data.json()
        this.setState({
            userInfo: userInfo
        })
    }

    render() {
        console.log('render called');
        const { name, avatar_url, company } = this.state.userInfo
        return (
            <div className='about-page'>
                 <div className='about-page__content'>
                <img src={avatar_url} className='about-page__content__image'/>
                <div className='about-page__content__name'>{name}</div>
                <div className='about-page__content__company'>{company}</div>
            </div>
            </div>
        )
    }
}

export default About
