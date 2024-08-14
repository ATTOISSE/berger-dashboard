import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FormBerger } from './admin/bergers/create';
import { ListBerger } from './admin/bergers';
import { Listclient } from './admin/clientList';
import { Statistic } from './admin/statistic/statistic';
import { Orders } from './admin/commandes';

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/add-berger" element={<FormBerger />} />
        <Route path="/list-berger" element={<ListBerger />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/clients" element={<Listclient />} />
        <Route path="/stats" element={<Statistic />} />
        <Route path="/" element={
          <div>
            <h1 className='text-center'>Bienvenue sur le Tableau de Bord</h1>
            <p className='text-center'>Sélectionnez une option dans la sidebar pour afficher le contenu.</p>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default Content;
