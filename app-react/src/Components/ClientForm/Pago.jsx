import React from 'react'
import {useState} from "react";

export const Pago = ({cliente, pagos, onInsertPay, cod_user}) => {
    console.log("MIS PAGITOS EN PAGOS:",pagos);
    const [pay, setPay] = useState('');
    const [methodPay, setMethodPay] = useState("EFECTIVO");
    const handleSubmit = (e) => {
        console.log(pay);
        const myPay = {
            cod_cliente: cliente.cod_cliente, 
            nombre_c:cliente.nombre_c,
            apellidos_c:cliente.apellidos_c,
            cantidad_pago:pay,
            tipo_pago:methodPay,
            cod_user: cod_user
        }
        console.log("MY PAY: ", myPay);
        e.preventDefault();
        onInsertPay(myPay);
    }
    const handleInputChange = (event) => {
        
        if(event.target.name === "cantidad"){
            setPay(event.target.value);
            console.log("pay: ", pay);
        }else if(event.target.name === "tipo_pago"){
            setMethodPay(event.target.value);
            console.log("METODO: ", methodPay);
        }
        
    }
    return (
        <>
        <h1 className="text-center">Pago cliente</h1>
            <form className="form-padding border border-dark div-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="cod_cliente">Código cliente</label>
                    <input type="number" className="form-control" id="cod_cliente" name="cod_cliente" value={cliente.cod_cliente} disabled/>
                </div>
                <div className="form-group">
                    <label for="nombre_c">Nombre cliente</label>
                    <input type="text" className="form-control" id="nombre_c" name="nombre_c"  value={cliente.nombre_c} disabled/>
                </div>
                <div className="form-group">
                    <label for="apellidos_c">Apellidos cliente</label>
                    <input type="text" className="form-control" id="apellidos_c" name="apellidos_c"  value={cliente.apellidos_c} disabled/>
                </div>
                <div className="form-group">
                    <label for="first_name">Cantidad de pago</label>
                    <input type="text" className="form-control" id="cantidad" name="cantidad" onChange={handleInputChange} value={pay}/>
                </div>
                <div className="form-group">
                    <label for="last_name">Forma de pago</label>
                    <br />
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="tipo_pago" onChange={handleInputChange}>
                        <option value="EFECTIVO" selected>EFECTIVO</option>
                        <option value="TARJETA">TARJETA</option>
                        <option value="BIZUM">BIZUM</option>
                    </select>
                    <br />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">REGISTRAR PAGO</button>
            </form>
            <br />
            <h1 className="text-center">Listado de Pagos</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="bg-dark text-light">
                        <th>#</th>
                        <th>Nombre y Apellidos</th>
                        <th>tipo pago</th>
                        <th>Cantidad</th>
                        <th>Fecha(aaaa-mm-dd)</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            pagos.map((pago) => {
                                return(
                                    <tr>
                                        <td>{pago.cod_cliente_p}</td>
                                        <td>{pago.nombre_c_p+" "+pago.apellidos_c_p}</td>
                                        <td>{pago.tipo_de_pago}</td>
                                        <td>{pago.cantidad_pago}</td>
                                        <td>{pago.fecha_pago.substring(0,10)}</td>
                                    </tr>                    
                                );
                            })
                        }
                    </tbody>
            </table>
        </>
    )
}
