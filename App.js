import React from "react"
import ReactDOM from 'react-dom'
import App from "."
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import About from "./components/About"
import ContactUs from "./components/ContactUs"
import Error from "./components/Error"
import Restaurants from "./components/Restaurants "
import RestaurantMenu from "./components/RestaurantMenu"
import Cart from "./components/Cart"

// create element using core react
// const heading = React.createElement('h1', { id: 'heading' }, 'heading')

// create element using JSX
// const jsxHeading = <h1 id="heading">heading with jsx</h1>

// const Title = () => {
//     return <h1>This is a title</h1>
// }

// const Component = () => {
//     return (
//         <div>
//             <Title/>
//             <h1>This is a component</h1>
//         </div>
//     )
// }


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Restaurants />
            },
            {
                path: '/about',
                element: <About name={'About page'} />,
            },
            {
                path: '/contactUs',
                element: <ContactUs />,
            },
            {
                path: '/restaurants/:resId',
                element: <RestaurantMenu />,
            },
            {
                path: '/cart',
                element: <Cart />,
            }
        ],
        errorElement:<Error/>
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={routes} />)