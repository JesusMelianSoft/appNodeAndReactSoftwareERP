import axios from 'axios';
const API_URL = 'http://localhost:8002/api/v1';

const aGetTrabajadorForLogin = (name, pass) => {
    return axios.get(`${API_URL}/trabajador/${name}/${pass}`).then((response) => response.data);
}

const aGetTrabajadoresLogin = () => {
    return axios.get(`${API_URL}/trabajadores/`).then((response) => response.data);
}

export default {aGetTrabajadorForLogin, aGetTrabajadoresLogin};
//export default agetAllActors;
//export default aDelActor;
//module.exports = { agetAllActors , aDelActor}
//module.exports = { agetAllActors, aDelActor }