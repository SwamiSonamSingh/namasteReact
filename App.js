import React from "react"
import ReactDOM from 'react-dom'

// create element using core react
// const heading = React.createElement('h1', { id: 'heading' }, 'heading')

// create element using JSX
// const jsxHeading = <h1 id="heading">heading with jsx</h1>

const Title = () => {
    return <h1>This is a title</h1>
}

const Component = () => {
    return (
        <div>
            <Title/>
            <h1>This is a component</h1>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Component/>)