import React from 'react'
import {useState, useEffect} from "react";

const initializedClient = {
    
        cod_cliente: '',
        nombre_c: '',
        apellidos_c: '',
        direccion_c: '',
        telefono_c: '',
        email_c: '',
        debe: '',

    
}
export const Edit = ({myClient, onEdit}) => {
    console.log('Elementos: '+myClient);
    //INICIO EL CLIENTE A VACIO TODO
    const [client, setClient] = useState(initializedClient);
    
    useEffect(() => {
        setClient(myClient);
        //CADA VEZ QUE YO CAMBIE MYCLIENT SE ACTUALIZA EL FORMULARIO
    }, [myClient]);
    //VOY CAMBIANDO EL VALOR CADA VEZ QUE MODIFICO ALGO EN EL FORMULARIO
    const handleInputChange = (event) => {
        console.log(event.target.value);
        setClient({
            ...client,
            [event.target.name]: event.target.value
        })
        console.log("mi client: ",client);
    }

    //LLAMO A LA FUNCION HANDLEEDIT DEL APP PARA EDITAR EL CLIENTE(HACER PUT)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmitClient', client);
        onEdit(client);
        //RESETEAMOS EL VALOR DE ACTOR PARA BORRAR LOS INPUTS
        setClient({
            cod_cliente: '',
            nombre_c: '',
            apellidos_c: '',
            direccion_c: '',
            telefono_c: '',
            email_c: '',
            debe: '',
        })

    }
    return (
        <>
        <h1 className="text-center">Editar cliente</h1>
            <form className="form-padding border border-dark div-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="last_name">Código</label>
                    <input type="number" className="form-control" id="cod_cliente" name="cod_cliente" onChange={handleInputChange} value={client.cod_cliente}/>
                </div>
                <div className="form-group">
                    <label for="first_name">Nombre</label>
                    <input type="text" className="form-control" id="nombre_c" name="nombre_c" onChange={handleInputChange} value={client.nombre_c}/>
                </div>

                <div className="form-group">
                    <label for="last_name">Apellidos</label>
                    <input type="text" className="form-control" id="apellidos_c" name="apellidos_c" onChange={handleInputChange} value={client.apellidos_c}/>
                </div>

                <div className="form-group">
                    <label for="last_name">Dirección</label>
                    <input type="text" className="form-control" id="direccion_c" name="direccion_c" onChange={handleInputChange} value={client.direccion_c}/>
                </div>
                <div className="form-group">
                    <label for="last_name">Debe</label>
                    <input type="number" className="form-control" id="debe" name="debe" onChange={handleInputChange} value={client.debe}/>
                </div>
                <div className="form-group">
                    <label for="last_name">Teléfono</label>
                    <input type="text" className="form-control" id="telefono_c" name="telefono_c" onChange={handleInputChange} value={client.telefono_c}/>
                </div>
                <div className="form-group">
                    <label for="last_name">email</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" onChange={handleInputChange} value={client.email_c}/>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">EDITAR</button>
            </form>
        </>
    )
}
