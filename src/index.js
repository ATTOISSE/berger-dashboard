import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OrderStatsProvider } from './components/admin/statistic/provider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <OrderStatsProvider>
        <App />
    </OrderStatsProvider>,
);
