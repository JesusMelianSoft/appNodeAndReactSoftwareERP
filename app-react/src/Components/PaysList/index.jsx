import React from 'react'
import {useState, useEffect} from "react";

export const PaysList = ({unLogin, onAction, pays, onDelete}) => {
    //OBTENGO TODOS LOS CLIENTES DE CADA EMPLEADO
    const [dato, setDato] = useState(undefined)
    var data;
    const handleInputChange = (event) => {
        data=event.target.value
        console.log("busqueda: "+data);
        //onSearchPay(data);
    }
    return (
        <>
        
        <div className="search_box">
        <button type="button" className="btn btn-danger m-2" onClick={unLogin}>CERRAR SESIÓN</button>
            <form action="onSearch">
                <label>BUSCAR:</label>
                <br />
                <input type="text" placeholder="Introduzca un nombre o un codigo" onChange={handleInputChange} value={data}/>
                <button type="button" className="btn btn-success m-2" onClick={() => {onAction(0,null)}}>CLIENTES</button>
                <button type="button" className="btn btn-success m-2" onClick={() => {onAction(6,null)}}>COMPRAS</button>            
            </form>
        </div>
        <br />
        <h1 className="text-center">Listado de Clientes</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="bg-dark text-light">
                        <th>#</th>
                        <th>Cod cliente</th>
                        <th>Nombre y Apellidos</th>
                        <th>Cantidad</th>
                        <th>Tipo de pago</th>
                        <th>Fecha de pago</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            pays.map((pay) => {
                                var fecha;
                                //A veces la fecha es nulo osea que debo hacer esto:
                                if(pay.fecha_pago != null) {
                                    fecha = pay.fecha_pago;
                                    fecha = fecha.substring(0,10);
                                }else{
                                    fecha="null";
                                }
                                
                                console.log("FECHA PAGO: ",pay.fecha_pago)
                                return(
                                    <tr>
                                        <td key={pay.cod_pago}>{pay.cod_pago}</td>
                                        <td>{pay.cod_cliente_p}</td>
                                        <td>{pay.nombre_c_p+" "+pay.apellidos_c_p}</td>
                                        <td>{pay.cantidad_pago}</td>
                                        <td>{pay.tipo_de_pago}</td>
                                        <td>{fecha.substring(0,10)}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" id={pay.cod_pago} onClick={() => onDelete(pay.cod_pago, pay.cod_user)}>BORRAR</button>
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
