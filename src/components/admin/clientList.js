import { useEffect, useState } from "react"
import { getClients } from "../../services/clientService";


export function Listclient() {
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error("Une erreur s'est produit lors du chargement ...", error);
            });
    }, []);

    return (
        <div className=" mt-4 ">
            <table className="table table-responsive table-dark">
                <thead>
                    <tr key="">
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Telephone</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.length > 0  ? (
                            clients.map((client, index) => (
                                <tr key={index}>
                                    <td>{client.name}</td>
                                    <td>{client.lastName} </td>
                                    <td>{client.telephone}</td>
                                </tr>
                            ))
                    ) : (
                        <tr key="">
                            <td colSpan="5">Aucun Client</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}