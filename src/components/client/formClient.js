import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { postClient } from "../../services/clientService";
import { postOrder } from "../../services/orderService";

export function FormClient() {

    const location = useLocation();
    const { orders } = location.state || { orders: [] };
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [client, setClient] = useState(null)
    const [clientOrders, setClientOrders] = useState([])
    const [customers, setCustomers] = useState(null);
    const [qtes, setQtes] = useState({});
    const [command, setCommand] = useState([]);
    const [commands, setCommands] = useState([]);
    const [etat, setEtat] = useState({'enCours':false,'termine':false,'paye':false})

    const handleClear = () => {
        setTelephone('')
        setName('')
        setLastName('')
    }

    useEffect(() => {
        if (Array.isArray(clientOrders) && clientOrders.length > 0) {
            const allCommandsSet = new Set(); 
            const allQuantities = {};
            let customerData = null;

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

    const addClient = (e) => {
        e.preventDefault()
        if (name.trim() != '' && telephone.trim() != '' && lastName.trim() != '') {
            const customer = { name, lastName, telephone }
            postClient(customer)
                .then(response => {
                    setClient({ ...client, ...response.data });
                });
            handleClear()
        }
    }

    useEffect(() => {
        if (client && orders.length > 0) {
            setClientOrders([...clientOrders, { orders: orders, client: client}])
        }
    }, [client, orders])

    useEffect(() => {
        if (command && command.length > 0) {
            const currentDate = new Date()
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            if (command.length > 0 ) { 
                const order = {qtes: qtes, date: formattedDate, orders: command, client: customers, etat: etat }
                postOrder(order)
                    .then(response => {
                        setClientOrders([...commands, response.data]);
                    });
                    goToOrdersClient()
            }
        }
    }, [command])

    const navigate = useNavigate()
    const goToOrdersClient = () => {
        navigate('/client/commandes', { state: { clientOrders } });
    };

    return (
        <div>
            <form className="container mt-5">
                <div className="card">
                    <h1 className="bg-dark text-info p-3 text-center"> Enregistrement d'un client</h1>
                    <div className="card-body">
                        <div className="mb-3" >
                            <label htmlFor="name" className="form-label">Nom</label>
                            <input className="form-control" value={name} name="name" type="text" id="name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Prenom</label>
                            <input value={lastName} className="form-control" name="lastName" type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Telephone</label>
                            <input value={telephone} className="form-control" name="telephone" type="text" id="telephone" onChange={(e) => setTelephone(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary col-3 offset-4" onClick={(event) => addClient(event)}>Valider une commande</button>
                    </div>
                </div>
            </form>
        </div>
    )
}