import React from 'react'
import {NavLink} from 'react-router-dom'

export default () => (

        <nav className="NavBar">
        <NavLink to="/">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        </nav>
    )
