import axios from "axios";

export const getClients = ()=> axios.get('http://localhost:8000/clients')
export const postClient = (client)=> axios.post('http://localhost:8000/clients', client)
