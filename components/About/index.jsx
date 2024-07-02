import React from 'react'
import './about.style.scss'

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
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
            <div>
                <img src={avatar_url} />
                <div>{name}</div>
                <div>{company}</div>
            </div>
        )
    }
}

export default About
