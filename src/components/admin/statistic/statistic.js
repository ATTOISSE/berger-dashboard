import React, { useEffect } from 'react';
import { useOrderStats } from './provider';
import { BarChart } from './bar';

export const Statistic = () => {
    const { stats } = useOrderStats()
    
    const chartData = {
        labels: ['Annulées', 'Validées', 'En cours', 'Payées'],
        datasets: [
            {
                label: 'Nombre de commandes',
                data: [stats.annule, stats.valide, stats.enCours, stats.paye],
                backgroundColor: [
                    'rgba(6, 134, 184, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(6, 134, 184, 0.2)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='mx-5 mt-4'>
            <div className='row'>
                <div className="card bg-dark mb-3 col-md-2 mx-4 p-0 text-white " style={{ maxWidth: '18rem', border: 'none', }}>
                    <h4 className="card-header bg-secondary text-center">Annulées</h4>
                    <div className="card-body">
                        <h1 className='text-center text-info'>{stats.annule}</h1>
                    </div>
                </div>
                <div className="card bg-info mb-3 col-md-2 mx-4 p-0 text-white " style={{ maxWidth: '18rem', border: 'none', }}>
                    <h4 className="card-header bg-success text-center"> Validées</h4>
                    <div className="card-body">
                        <h1 className='text-center text-dark'>{stats.valide}</h1>
                    </div>
                </div>
                <div className="card bg-primary mb-3 col-md-2 mx-4 p-0" style={{ maxWidth: '18rem', border: 'none', }}>
                    <h4 className="card-header bg-warning text-center"> En cours</h4>
                    <div className="card-body">
                        <h1 className='text-center text-light'>{stats.enCours}</h1>
                    </div>
                </div>
                <div className="card bg-secondary mb-3 col-md-2 mx-4 p-0 text-white " style={{ maxWidth: '18rem', border: 'none', }}>
                    <h4 className="card-header bg-info text-center"> Payées</h4>
                    <div className="card-body">
                        <h1 className='text-center text-warning'>{stats.paye}</h1>
                    </div>
                </div>
            </div>
            <div className="mt-5">
            </div>
                <BarChart chartData={chartData} />
        </div>
    );
};
