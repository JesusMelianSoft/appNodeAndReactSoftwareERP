const express = require('express');
//Cors nos permite compartir datos dentro del mismo servidor
const cors = require('cors');
const { query } = require('../config/db.js');
const app = express();
app.disable('x-powered-by');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    //permite el control de acceso al origen, permite compartir recursos dentro del mismo servidor
app.use(cors());

let server;
const runServer = () => {
    // Initialize the server
    server = app.listen(8002, () => {
        console.log(
            `Server started at port http://localhost:${server.address().port}`
            );
    })
}

const stopServer = () => {
    console.log('Closing out remaining connection');
    server.close();
}
/*
* Rutas de Nuestra API 
*/

//OBTENER CLIENTES DE UN TRABAJADOR ESPECIFICO
app.get('/api/v1/clients/:cod_user', async(req, res) => {
    const { cod_user } = req.params;
    try {
        const sql = "SELECT * FROM clientes WHERE cod_user ="+cod_user;
        const result = await query(sql);
        let message = '';
        if(result === undefined || result.length === 0) {
            message = 'Actores table is empty';
        }else{
            message = 'Successfully retrieved all actors';
        }

        res.send({ 
            error: false,
            data: result,
            message: message
        })
    } catch (error) {
        console.log(error);
        res.resStatus(500);
    }
})

//HACER LOGIN EN BD
app.get('/api/v1/trabajador/:name/:pass', async(req, res) => {
    const { name, pass } = req.params;
    try {
        const sql = "SELECT `cod_user` FROM `trabajadores` WHERE name=? AND pass=MD5(?)";
        const result = await query(sql, [name, pass]);
        let message = '';
        if(result === undefined || result.length === 0) {
            message = 'Actores table is empty';
        }else{
            message = 'Successfully retrieved all actors';
        }

        res.send({ 
            error: false,
            data: result,
            message: message
        })
    } catch (error) {
        console.log(error);
        res.resStatus(500);
    }
})


//OBTENER TRABAJADORES
//HACER LOGIN EN BD
app.get('/api/v1/trabajadores/', async(req, res) => {
    const { name, pass } = req.params;
    try {
        const sql = "SELECT * FROM `trabajadores`";
        const result = await query(sql);
        let message = '';
        if(result === undefined || result.length === 0) {
            message = 'Actores table is empty';
        }else{
            message = 'Successfully retrieved all actors';
        }

        res.send({ 
            error: false,
            data: result,
            message: message
        })
    } catch (error) {
        console.log(error);
        res.resStatus(500);
    }
})

app.get('/api/v1/client/:cod_client/:cod_user', async(req, res) => {
    console.log('PARAMS',req.params);
    const { cod_client, cod_user } = req.params;
    console.log('COD_CLIENTE: '+cod_client);
    console.log('COD_USER: ',cod_user);
    try {
        const sql = "SELECT * FROM clientes WHERE cod_cliente = ? AND cod_user = ?";
        const result = await query(sql, [cod_client, cod_user]);
        let message = '';
        if(result === undefined || result.length === 0) {
            message = 'Actores table is empty';
        }else{
            message = 'Successfully retrieved all client';
        }

        res.send({ 
            error: false,
            data: result,
            message: message
        })
    } catch (error) {
        console.log(error);
        res.resStatus(500);
    }
})
//Update client by cod
app.put('/api/v1/client/:cod_client', async(req, res) => {
    console.log(req.body);
    const { cod_cliente, nombre_c, apellidos_c, direccion_c, telefono_c, email_c, debe } = req.body;
    const { cod_client } = req.params;
    console.log('req.body: ',req.body);

    try {
        const sql = 'UPDATE clientes SET cod_cliente = ?, nombre_c = ?, apellidos_c = ?, direccion_c = ?, telefono_c = ?, email_c = ?, debe = ? WHERE cod_cliente = ?';
        const result = await query(sql, [cod_cliente, nombre_c, apellidos_c, direccion_c, telefono_c, email_c, debe, cod_client])

        let message = '';
        if(result.changedRows == 0){
            message = 'Actor not found or data are same';
        }else{
            message = 'Actor successfully updated';
        }
        res.send({
            error: false,
            data: {chandedRows: result.chandedRows},
            message: message
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//Delete client by id
app.delete('/api/v1/client/:cod_cliente/:cod_user', async(req, res) => {
    const { cod_cliente, cod_user} = req.params;

    if(!cod_cliente){
        res.status(400).send({ 
            error: true,
            message: 'provide actor id',

        })
    }
    try {
        const sql = "DELETE FROM clientes WHERE cod_cliente = ? AND cod_user = ?";
        const result = await query(sql, [cod_cliente, cod_user]);
        let message = '';
        
        if(result.affectedRows === 0) {
            message = 'Client is not found';
        }else{
            message = 'Client successfully delete';
        }

        res.send({
            error: false,
            data: {affectedRows: result.affectedRows},
            message: message
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = { runServer, stopServer };
