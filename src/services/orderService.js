import axios from "axios";

export const postOrder = (order)=> axios.post('http://localhost:8000/commandes', order)
export const getCommandes = ()=> axios.get('http://localhost:8000/commandes')
export const putCommandes = (id,commande)=> axios.put(`http://localhost:8000/commandes/`+id, commande)
