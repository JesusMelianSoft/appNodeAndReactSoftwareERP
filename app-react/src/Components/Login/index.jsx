import React from 'react';
import {useState, useEffect} from "react";
import bd from '../../services/services'
const md5 = require('md5');

export const Login = ({onLogin}) => {
    const [msg, setMsg] = useState('');
    //DATOS DEL LOGIN
    const [loginData, setLoginData] = useState({
        name: '',
        pass: ''
    });
    //COMPRUEBO QUE SE HA INSERTADO USER Y PASS
    const handleLogin = (nombre, passwd) =>{
        //añado los datos al login
        setLoginData({
            name: nombre,
            pass: passwd
        })

        if(loginData.name && loginData.pass){
            comprobeLogin();
        }
    }
    //compruebo los datos obtenidos de login y los de la bd
    const comprobeLogin = () => {
        var codUser;
        //Obtengo todos los trabajadores
        bd.aGetTrabajadoresLogin().then((res) => {
          //recorro todos los trabajadores y compruebo si coinciden las introducidas con las de la bd
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].name===loginData.name && res.data[i].pass===md5(loginData.pass)){
                    console.log(res.data[i].cod_user);
                    codUser=res.data[i].cod_user;
                    //funcion que logea desde el app
                    onLogin(true, codUser);
                    break;
                }
            }
        });
        if(codUser==null){
            setMsg("CONTRASEÑA O USUARIO INCORRECTO");
        }
        console.log(codUser);
    }
    
    const handleInputChange = (event) => {
        console.log(event.target.value);
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //compruebo el login
        handleLogin(loginData.name, loginData.pass);
    }
    return (
        <div>
            <form className="formLogin" onSubmit={handleSubmit}>
                <h5 className="title-form">DECORACIONES ÁNGEL E HIJAS </h5>
                <br />
                <div className="div-form">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={handleInputChange}/>
                        <div id="emailHelp" className="form-text">Inserta tu usuario</div>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="pass" name="pass" onChange={handleInputChange} />
                    </div>
                    <hr />
                    <div id="error" className="error-login">{msg}</div>
                    <button type="submit" className="btn btn-success">ENTRAR</button>
                </div>
            </form>
        </div>
    )
}
