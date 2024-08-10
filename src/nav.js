import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

export function Nav() {
    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand offset-1" href="/"> <b> CINAYE BURGER</b></a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/client" className="nav-link mx-3 ">Home</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink to="/client/catalogue" className="nav-link mx-3 ">Catalogue</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink to="/client/commande" className="nav-link mx-3 ">Panier</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink to="/client/commandes" className="nav-link mx-3 ">Commandes</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}

