import React from 'react'
import {useState} from "react";

export const Pago = ({cliente, pagos, onInserPay}) => {

    const [pay, setPay] = useState('');
    const [methodPay, setMethodPay] = useState("EFECTIVO");
    const handleSubmit = (e) => {
        e.preventDefault();
        //onInsertPay(pay, methodPay);
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
                    <select name="tipo_pago" onChange={handleInputChange}>
                        <option value="EFECTIVO" selected>EFECTIVO</option>
                        <option value="TARJETA">TARJETA</option>
                        <option value="BIZUM">BIZUM</option>
                    </select>
                    <br />
                </div>
                <button type="submit" className="btn btn-primary">REGISTRAR PAGO</button>
            </form>
        </>
    )
}
