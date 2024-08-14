import { useEffect, useState } from "react";
import { getCommandes, putEtat } from "../../services/orderService";
import { useOrderStats } from "./statistic/provider";
import { toast, ToastContainer } from "react-toastify";

export const Orders = () => {
    const [orders, setCommands] = useState([]);
    const { incrementStat } = useOrderStats();
    const [searchDate, setSearchDate] = useState('');
    const [searchClient, setSearchClient] = useState('');
    const [searchBerger, setSearchBerger] = useState('');
    const [searchEtat, setSearchEtat] = useState('');


    useEffect(() => {
        getCommandes()
            .then(response => {
                setCommands(response.data);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors du chargement', error);
            });
    }, [orders]);

    const handleEncours = (id, currentEtat) => {
        const updatedEtat = { ...currentEtat, enCours: true };
        const currentOrder = orders.find(order => order.id === id);

        if (currentOrder) {
            const updatedOrder = {
                ...currentOrder, etat: updatedEtat
            };

            putEtat(id, updatedOrder)
                .then(response => {
                    toast("La commande est prise en charge !!!")
                    setCommands(prevOrders =>
                        prevOrders.map(order =>
                            order.id === id
                                ? { ...order, etat: response.data.etat }
                                : order
                        )
                    );
                    incrementStat('enCours');
                    document.getElementById(`btnEncours${id}`).setAttribute('disabled', '');
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour de l\'état', error);
                });
        } else {
            console.error('Commande non trouvée');
        }
    };

    const handleTermine = (id, currentEtat) => {
        const updatedEtat = { ...currentEtat, termine: true };
        const currentOrder = orders.find(order => order.id === id);
    
        if (currentOrder) {
            const updatedOrder = {
                ...currentOrder, etat: updatedEtat
            };
    
            putEtat(id, updatedOrder)
                .then(response => {
                    toast("La commande est terminée !!!");
                    setCommands(prevOrders =>
                        prevOrders.map(order =>
                            order.id === id
                                ? { ...order, etat: response.data.etat }
                                : order
                        )
                    );
                    incrementStat('valide');
                    document.getElementById(`btnTerminer${id}`).setAttribute('disabled', '');
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour de l\'état', error);
                });
        } else {
            console.error('Commande non trouvée');
        }
    };
    
    const handlePaye = (id, currentEtat) => {
        const updatedEtat = { ...currentEtat, paye: true };
        const currentOrder = orders.find(order => order.id === id);
    
        if (currentOrder) {
            const updatedOrder = {
                ...currentOrder, etat: updatedEtat
            };
    
            putEtat(id, updatedOrder)
                .then(response => {
                    toast("La commande à été payé avec succès !!!");
                    setCommands(prevOrders =>
                        prevOrders.map(order =>
                            order.id === id
                                ? { ...order, etat: response.data.etat }
                                : order
                        )
                    );
                    incrementStat('paye');
                    document.getElementById(`btnPaye${id}`).setAttribute('disabled', '');
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour de l\'état', error);
                });
        } else {
            console.error('Commande non trouvée');
        }
    };

    const filteredOrders = orders
    .map(order => ({
        id: order.id || 'N/A',
        clientName: order.client ? `${order.client.name} ${order.client.lastName}` : 'Inconnu',
        firstBergerName: (order.orders && order.orders.length > 0) ? order.orders[0].name : 'N/A',
        firstBergerPrice: (order.orders && order.orders.length > 0) ? order.orders[0].price : 0,
        quantity: (order.orders && order.qtes && order.orders.length > 0) ? order.qtes[order.orders[0].id] : 0,
        date: order.date || 'Inconnu',
        etat: order.etat || {}
    }))
    .filter(order => {
        const dateMatch = order.date.includes(searchDate);
        const clientMatch = order.clientName.toLowerCase().includes(searchClient.toLowerCase());
        const bergerMatch = order.firstBergerName.toLowerCase().includes(searchBerger.toLowerCase());

        const etatMatch = searchEtat === '' || (() => {
            switch (searchEtat) {
                case 'enCours':
                    return order.etat.enCours === true;
                case 'termine':
                    return order.etat.termine === true;
                case 'paye':
                    return order.etat.paye === true;
                default:
                    return false;
            }
        })();

        return dateMatch && clientMatch && bergerMatch && etatMatch;
    });

    return (
        <div className="mt-4">
            <form className="form-inline mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Rechercher par date"
                            aria-label="Search Date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Rechercher par client"
                            aria-label="Search Client"
                            value={searchClient}
                            onChange={(e) => setSearchClient(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Rechercher par berger"
                            aria-label="Search Berger"
                            value={searchBerger}
                            onChange={(e) => setSearchBerger(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-control"
                            aria-label="Select Etat"
                            value={searchEtat}
                            onChange={(e) => setSearchEtat(e.target.value)}
                        >
                            <option value="">Tous les états</option>
                            <option value="enCours">En cours</option>
                            <option value="termine">Terminé</option>
                            <option value="paye">Payé</option>
                        </select>
                    </div>
                </div>
            </form>
            {filteredOrders.length > 0 ? (
                <table className="table table-responsive mt-4">
                    <thead>
                        <tr>
                            <th className="text-center">ID Commande</th>
                            <th className="text-center">Nom Client</th>
                            <th className="text-center">Berger</th>
                            <th className="text-center">Prix</th>
                            <th className="text-center">Qté</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td>{order.clientName}</td>
                                <td>{order.firstBergerName}</td>
                                <td>{order.firstBergerPrice} €</td>
                                <td>{order.quantity}</td>
                                <td>{order.date}</td>
                                <td>
                                    <button
                                        id={`btnEncours${order.id}`}
                                        className="btn btn-secondary"
                                        onClick={() => handleEncours(order.id, order.etat)}
                                        disabled={order.etat.enCours}
                                    >
                                        En cours
                                    </button>
                                    <button
                                        id={`btnTerminer${order.id}`}
                                        className="btn btn-success mx-2"
                                        onClick={() => handleTermine(order.id, order.etat)}
                                        disabled={order.etat.termine}
                                    >
                                        Terminer
                                    </button>
                                    <button
                                        id={`btnPaye${order.id}`}
                                        className="btn btn-info"
                                        onClick={() => handlePaye(order.id, order.etat)}
                                        disabled={order.etat.paye}
                                    >
                                        Payer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info">Aucune commande trouvée</div>
            )}
            <ToastContainer />
        </div>
    );
};
