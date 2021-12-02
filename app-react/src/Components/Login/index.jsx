import React from 'react';
import {useState, useEffect} from "react";

export const Login = ({onLogin}) => {
    const [datos, setDatos] = useState({
        name: '',
        pass: ''
    })
    const handleInputChange = (event) => {
        console.log(event.target.value);
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        console.log("mi trabajador: ",datos);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //compruebo el login
        onLogin(datos.name, datos.pass);
    }
    return (
        <div>
            <form className="formLogin" onSubmit={handleSubmit}>
                <div>
                {/* <img src="../img/logo.jpg" alt="logo"/> */}
                <h5>DECORACIONES ÁNGEL E HIJAS</h5>
                </div> 
                
                <br />
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={handleInputChange}/>
                    <div id="emailHelp" className="form-text">Inserta tu usuario</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="pass" name="pass" onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">ENTRAR</button>
            </form>
        </div>
    )
}
