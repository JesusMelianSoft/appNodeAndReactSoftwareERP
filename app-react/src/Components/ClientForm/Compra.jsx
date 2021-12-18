import React from 'react'
import {useState, useEffect} from "react";
    

export const Compra = ({compras, client, onInsertBuy, ultCompra, onAction, onTicket}) => {
    console.log("COMPRAS CLIENTE:",client);
    
    if(client===undefined){
        console.log("EL CLIENTE ES UNDEFINED");
        onAction(0);
    }
        const initialBuy = {
            codArt: 1,
            codCli: client.cod_cliente,
            nombreCli: client.nombre_c,
            apellidosCli: client.apellidos_c,
            nombreArt: 'VARIOS',
            precio: '',
            cantidad: 1,
            subtotal: 0,
            total: 0,
            cod_user: client.cod_user
        }
        const [lastBuys, setLastBuys] = useState(initialBuy);
        const [buys, setBuys] = useState(compras);
        const [buy, setBuy] = useState(initialBuy);
    
        useEffect(() => {
            console.log("USEEFFECT");
            setBuys(compras);
            setLastBuys(ultCompra);
        },[compras, ultCompra]);
        
        
        
        const handleInputChange = (event) => {
            
            setBuy({
                ...buy, 
                [event.target.name]: event.target.value
            })
            setLastBuys({
                ...lastBuys,
                [event.target.name]: event.target.value
            })
    
            
            console.log("CAMBIO: ",buy);
        }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            //AGREGAMOS SUBTOTAL Y TOTAL
            buy.total=(parseFloat(buy.precio)*parseFloat(buy.cantidad));
            buy.subtotal=(parseFloat(buy.precio));
            console.log("ENVIAMOS: ",buy);
            //INSERTAMOS EL TOTAL
            if(buy.precio==='' || buy.cantidad==='' || buy.cantidad===null) {
                window.alert("DEBE INSERTAR PRECIO Y CANTIDAD");
            }else{
                onInsertBuy(buy);
                setBuy(initialBuy);
            }
        }

        return (
        <>
        <h1 className="text-center">Compra cliente</h1>
            <form className="form-padding border border-dark div-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="cod_cliente">Código cliente</label>
                    <input type="number" className="form-control" id="codCli" name="codCli" value={client.cod_cliente} disabled/>
                </div>
                <div className="form-group">
                    <label for="nombre_c">Nombre cliente</label>
                    <input type="text" className="form-control" id="nombreCli" name="nombreCli"  value={client.nombre_c} disabled/>
                </div>
                <div className="form-group">
                    <label for="apellidos_c">Apellidos cliente</label>
                    <input type="text" className="form-control" id="apellidosCli" name="apellidosCli"  value={client.apellidos_c} disabled/>
                </div>
                <div className="form-group">
                    <label for="first_name">Nombre artículo</label>
                    <input type="text" className="form-control" id="nombreArt" name="nombreArt" onChange={handleInputChange} value={buy.nombreArt}/>
                </div>
                <div className="form-group">
                    <label for="precio">Precio</label>
                    <input type="number" className="form-control" id="precio" name="precio" onChange={handleInputChange} value={buy.precio}/>
                </div>
                <div className="form-group">
                    <label for="precio">Cantidad</label>
                    <input type="number" className="form-control" id="cantidad" name="cantidad" onChange={handleInputChange} value={buy.cantidad}/>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">AÑADIR</button>
            </form>
            <br />
            <h1 className="text-center">Ultima Compra</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="bg-dark text-light">
                        <th>#</th>
                        <th>Nombre y Apellidos</th>
                        <th>precio</th>
                        <th>nombreArt</th>
                        <th>cantidad</th>
                        <th>Total</th>
                        <th>Fecha(aaaa-mm-dd)</th>
                    </tr>
                </thead>
                    <tbody>
                    {
                            ultCompra.map((lastBuy) => {
                                return(
                                    <tr>
                                        <td>{lastBuy.codCli}</td>
                                        <td>{lastBuy.nombreCli+" "+lastBuy.apellidosCli}</td>
                                        <td>{lastBuy.nombreArt}</td>
                                        <td>{lastBuy.cantidad}</td>
                                        <td>{lastBuy.precio}</td>
                                        <td>{lastBuy.total}</td>
                                        <td>{lastBuy.fechaCom.substring(0,10)}</td>
                                    </tr>                    
                                );
                            })
                        }
                    </tbody>
            </table>
            <br />
            <button type="button" className="btn btn-secondary m-2" onClick={() => onTicket(lastBuys)}>TICKET</button>
            <br />
            <h1 className="text-center">Listado de Compras</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="bg-dark text-light">
                        <th>#</th>
                        <th>Nombre y Apellidos</th>
                        <th>precio</th>
                        <th>nombreArt</th>
                        <th>cantidad</th>
                        <th>Total</th>
                        <th>Fecha(aaaa-mm-dd)</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            compras.map((compra) => {
                                return(
                                    <tr>
                                        <td>{compra.codCli}</td>
                                        <td>{compra.nombreCli+" "+compra.apellidosCli}</td>
                                        <td>{compra.precio}</td>
                                        <td>{compra.nombreArt}</td>
                                        <td>{compra.cantidad}</td>
                                        <td>{compra.total}</td>
                                        <td>{compra.fechaCom.substring(0,10)}</td>
                                    </tr>                    
                                );
                            })
                        }
                    </tbody>
            </table>
        </>
        )
    
}