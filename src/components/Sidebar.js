import React from 'react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/admin/add-berger" className="nav-link"> <i className="bi bi-house-add-fill"></i>  Ajouter Berger</Link>
      <Link to="/admin/list-berger" className="nav-link"> <i className="bi bi-list-columns"></i> Liste Berger</Link>
      <Link to="/admin/orders" className="nav-link"><i className="bi bi-bag-check-fill"></i> Commandes</Link>
      <Link to="/admin/clients" className="nav-link"> <i className="bi bi-people-fill"></i> Clients</Link>
      <Link to="/admin/stats" className="nav-link"><i className="bi bi-bar-chart-line-fill"></i> Statistiques</Link>
    </div>
  );
}

export default Sidebar;
