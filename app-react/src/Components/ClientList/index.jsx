import React from 'react'
import {useState, useEffect} from "react";
import bd from '../../services/services';

export const ClientList = ({ onAction, onDelete, cod_user, clients = [] , unLogin}) => {

    console.log('CLIENT LIST COD_USER: ', cod_user);
    //OBTENGO TODOS LOS CLIENTES DE CADA EMPLEADO
    

    // //ESTO SIRVE PARA QUE SE CARGE LA PRIMERA VEZ
    // useEffect(() => {
    //     handleGetAllClientByUser(cod_user);
    // });
    return (
        <>
        <h1 className="text-center">Listado de Clientes</h1><button type="button" className="btn btn-danger m-2" onClick={unLogin}>CERRAR SESIÓN</button>
            <table className="table table-striped">
                <thead>
                    <tr className="bg-dark text-light">
                        <th>#</th>
                        <th>Nombre y Apellidos</th>
                        <th>Dirección</th>
                        <th>Debe</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            clients.map((client) => {
                                return(
                                    <tr>
                                        <td key={client.cod_cliente}>{client.cod_cliente}</td>
                                        <td>{client.nombre_c+" "+client.apellidos_c}</td>
                                        <td>{client.direccion_c}</td>
                                        <td>{client.debe}</td>
                                        <td>
                                            <button type="button" className="btn btn-success m-2" id={client.cod_cliente} onClick={() => {onAction(2,client.cod_cliente)}}>PAGO</button>
                                            <button type="button" className="btn btn-success m-2" id={client.cod_cliente} onClick={() => {onAction(3,client.cod_cliente)}}>COMPRA</button>
                                            <button type="button" className="btn btn-warning m-2" id={client.cod_cliente} onClick={() => {onAction(1,client.cod_cliente)}}>EDITAR</button>
                                            <button type="button" className="btn btn-danger" id={client.cod_cliente} onClick={() => onDelete(client.cod_cliente, cod_user)}>BORRAR</button>
                                        </td>
                                    </tr>                    
                                );
                            })
                        }
                    </tbody>
            </table>
        </>
    )
}
