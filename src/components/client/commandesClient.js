import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Nav } from "../../nav";

export function OrdersClient() {
    const location = useLocation();
    const { clientOrders: initialClientOrders } = location.state || { clientOrders: [] };
    const [clientOrders, setClientOrders] = useState(Array.isArray(initialClientOrders) ? initialClientOrders : []);
    const notify = () => toast("La commande a été passé avec succés !!!")
    const notifyPaye = () => toast.success("La commande a ete payé avec success !")

    const [customers, setCustomers] = useState(null);
    const [qtes, setQtes] = useState({});
    const [command, setCommand] = useState([]);

    useEffect(() => {
        if (Array.isArray(clientOrders) && clientOrders.length > 0) {
            const allCommandsSet = new Set();
            const allQuantities = {};
            let customerData = null;
            notify()
            clientOrders.forEach(cl => {
                if (cl && cl.client && Array.isArray(cl.orders)) {
                    customerData = cl.client;
                    cl.orders.forEach(order => {
                        if (order && Array.isArray(order.commandes)) {
                            order.commandes.forEach(commande => {
                                allCommandsSet.add(commande);
                            });
                            if (order.quantites) {
                                Object.assign(allQuantities, order.quantites);
                            }
                        }
                    });
                }
            });   
            setCommand([...allCommandsSet]);
            setQtes(allQuantities);
            setCustomers(customerData);
        }
    }, [clientOrders]);

    return <>
        <Nav />
        <div className="container mt-4 col-10">
            {customers ? (
                <div className="card bg-info">
                    <div className="card-header">
                        <h2 className="text-center">
                            {customers.name} - {customers.lastName} - {customers.telephone}
                        </h2>
                    </div>
                </div>
            ) : null}
            <table className="table table-responsive">
                <thead>
                    <tr key="" id="thead">
                        <th>N°</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Montant</th>
                    </tr>
                </thead>
                <tbody>
                    {command.length > 0 ? (
                        command.map((commande, index) => (
                            <tr key={index}>
                                <td>{commande.id}</td>
                                <td>{commande.name}</td>
                                <td>{commande.price} €</td>
                                <td>{qtes[commande.id]}</td>
                                <td>{(qtes[commande.id] * commande.price).toFixed(2)} €</td>
                            </tr>
                        ))
                    ) : (
                        <tr key="">
                            <td colSpan="7" className="alert alert-info">Aucune commande effectuée</td>
                        </tr>
                    )}
                    {command.length > 0 && (
                        <tr>
                            <th colSpan="3" className="text-center">Total</th>
                            <th colSpan="3" className="text-center">
                                {command.reduce((total, commande) => total + (qtes[commande.id] || 1) * commande.price, 0).toFixed(2)} €
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    </>
}

export default OrdersClient;
