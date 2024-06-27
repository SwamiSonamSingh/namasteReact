import React from 'react'
import { useRouteError } from 'react-router-dom'
import './error.style.scss'

const Error = () => {
    const error = useRouteError()
    console.log(error);
    return (
        <div>
            Something went wrong
            <div>{`${error.status} : ${error.statusText}`}</div>
        </div>
    )
}

export default Error
