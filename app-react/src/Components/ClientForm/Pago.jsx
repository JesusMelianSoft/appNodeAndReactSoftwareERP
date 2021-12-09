import React from 'react'
import {useState} from "react";

export const Pago = ({cod_cliente, cod_user, pagos}) => {
    const [pay, setPay] = useState();
    const handleSubmit = () => {
        e.preventDefault();
        console.log('handleSubmitClient', client);
        onInsertPay(pay);
    }
    const handleInputChange = (event) => {
        
    }
    return (
        <>
        <h1 className="text-center">Pago cliente</h1>
            <form className="form-padding border border-dark div-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="last_name">Código cliente</label>
                    <input type="number" className="form-control" id="cod_cliente" name="cod_cliente" onChange={handleInputChange} value={cod_cliente}/>
                </div>
                <div className="form-group">
                    <label for="first_name">Cantidad de pago</label>
                    <input type="text" className="form-control" id="nombre_c" name="nombre_c" onChange={handleInputChange} value={client.nombre_c}/>
                </div>
                <button type="submit" className="btn btn-primary">REGISTRAR PAGO</button>
            </form>
        </>
    )
}
