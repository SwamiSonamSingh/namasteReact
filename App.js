import React from "react"
import ReactDOM from 'react-dom'

// create element using core react
const heading = React.createElement('h1', { id: 'heading' }, 'heading')

// create element using JSX
const jsxHeading = <h1 id="heading">heading with jsx</h1>
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(jsxHeading)