import axios from 'axios';
const API_URL = 'http://localhost:8002/api/v1';

const aGetTrabajadorForLogin = (name, pass) => {
    return axios.get(`${API_URL}/trabajador/${name}/${pass}`).then((response) => response.data);
}

const aGetTrabajadoresLogin = () => {
    return axios.get(`${API_URL}/trabajadores/`).then((response) => response.data);
}

const aGetClients = (cod_user) => {
    return axios.get(`${API_URL}/clients/${cod_user}`).then((response) => response.data);
}

const delClientByCod = (cod_client, cod_user) => {
    console.log("DEL CLIENTE: "+`${API_URL}/client/${cod_client}/${cod_user}`)
    return axios.delete(`${API_URL}/client/${cod_client}/${cod_user}`).then((response) => response.data);
}

const aGetClientByCod = (cod_client, cod_user) => {
    console.log("aGetClientById: "+`${API_URL}/client/${cod_client}/${cod_user}`);
    return axios.get(`${API_URL}/client/${cod_client}/${cod_user}`).then((response) => response.data);
}

const aPutClient = (client) => {
    console.log('aPutClient'+`${API_URL}/client/${client.cod_cliente}`, client)
    return axios.put(`${API_URL}/client/${client.cod_cliente}`, client).then((response) => response.data);
}

const aGetDebeClients = (cod_user) => {
    console.log('aGetDebeClients'+`${API_URL}/totalDebeClient/${cod_user}`);
    return axios.get(`${API_URL}/totalDebeClient/${cod_user}`).then((response) => response.data);
}

const aInsertClient = (client) => {
    console.log(client)
    return axios.post(`${API_URL}/client/`, client).then((response) => response.data);
}
export default {aGetTrabajadorForLogin, aGetTrabajadoresLogin, aGetClients, delClientByCod, aGetClientByCod, aPutClient, aGetDebeClients, aInsertClient};