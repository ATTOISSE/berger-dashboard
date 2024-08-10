import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="App-img">
      <div>
        <Link to="/admin" className="btn btn-outline-primary m-2 bord text-white">
          Accéder à l'Admin
        </Link>
        <Link to="/client" className="btn btn-outline-secondary m-2 bord text-info">
          Accéder au Client
        </Link>
      </div>
    </div>
  );
}

export default Home;
