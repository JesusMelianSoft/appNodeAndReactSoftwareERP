import React from 'react'

export const NavBar = ({title, designed}) => {
    return (
        <>
            { designed
                ? 
                <div className="title">
                    <h1 >{title}</h1>
                    <span className="light">Designed by: Jesús David Melián</span>
                </div> 
                :
                <span></span>
            }
            
            </>
    )
}
