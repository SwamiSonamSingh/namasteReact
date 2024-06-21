const heading = React.createElement('h1', { id: 'parent' },
    [React.createElement('div', { id: 'child1' },
        [React.createElement('h1', { id: 'heading1' }, 'This is hierarchy heading 1'), React.createElement('h1', { id: 'heading2' }, 'This is hierarchy heading 2')]),
    React.createElement('div', { id: 'child2' },
        [React.createElement('h1', { id: 'heading1' }, 'This is hierarchy heading 1'), React.createElement('h1', { id: 'heading2' }, 'This is hierarchy heading 2')])]
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(heading)