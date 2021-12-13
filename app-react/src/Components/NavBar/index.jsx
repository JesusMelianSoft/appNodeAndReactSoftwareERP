import React from 'react'

export const NavBar = ({title}) => {
    return (
        <div className="title">
            <h1 >{title}</h1>
            <span className="light">Designed by: Jesús David Melián</span>
        </div>
    )
}
