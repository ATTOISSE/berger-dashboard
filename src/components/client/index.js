import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeClient } from './home';
import { Catalog } from './catalog';
import { OrderDetails } from './detailCommande';
import { FormClient } from './formClient';
import { OrdersClient } from './commandesClient';

export function Client() {
  return (
    <div>
      <Routes>
        <Route path="catalogue" element={<Catalog />} />
        <Route path="commande" element={<OrderDetails />} />
        <Route path="register" element={<FormClient />} />
        <Route path="commandes" element={<OrdersClient />} />
        <Route path="/" element={<HomeClient />} />
      </Routes>
    </div>
  );
}

export default Client;
