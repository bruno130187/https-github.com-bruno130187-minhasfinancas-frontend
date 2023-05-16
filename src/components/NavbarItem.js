import React from 'react';
import { NavLink } from 'react-router-dom';

function NavbarItem({ render, ...props }) {

    if (render) {
        return (
            <li className="nav-item">
                <NavLink className="nav-link" onClick={props.onClick} to={props.address}>{props.label}</NavLink>
            </li>
        )
    } else {
        return false;
    }
}

export default NavbarItem;