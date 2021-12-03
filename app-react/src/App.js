import './App.css';
import {useState, useEffect} from "react";
import {Login} from './Components/Login'
import {ClientList} from './Components/ClientList'
import bd from './services/services'
const md5 = require('md5');

function App() {
  const [loged, setLoged] = useState(false);
  const [loginData, setLoginData] = useState({
    name: '',
    pass: ''
  });
  const [codUser, setCodUser] = useState(null);
  const [reload, setReload] = useState(true);
  const [msg, setMsg] = useState('');

  const handleLogin = (nombre, passwd) =>{
    //añado los datos al login
    setLoginData({
      name: nombre,
      pass: passwd
    })
    console.log("Login data:",loginData)
    if(loginData.name && loginData.pass){
      console.log("LLENo")
      comprobeLogin();
      
    }
  }
  
  const comprobeLogin = () => {
    console.log(md5(loginData.pass));
    //Obtengo todos los trabajadores
    bd.aGetTrabajadoresLogin().then((res) => {
      console.log(res.data);
      //recoroo todos los trabajadores y compruebo si coinciden las introducidas con las de la bd
      for(let i = 0; i < res.data.length; i++){
        console.log("namebd: ", res.data[i].name);
        console.log("name: ", loginData.name)
        console.log("passbd: ",res.data[i].pass)
        console.log("pass: ", md5(loginData.pass))
        if(res.data[i].name===loginData.name && res.data[i].pass===md5(loginData.pass)){
          console.log(res.data[i].cod_user);
          setCodUser(res.data[i].cod_user);
          setLoged(true);
          //setReload(true);
          break;
        }
      }
    });
    console.log(codUser);
  }

  //ESTO SIRVE PARA QUE SE CARGE LA PRIMERA VEZ
  useEffect(() => {
    
      setReload(false);
    
    //le paso una variable, si esta a true, recarga, y si no no recarga
  }, [reload]);
  
  return (
    <>
    { !loged ? <Login onLogin={handleLogin}/> : <ClientList id={1}/> }
    </>
  );
}

export default App;
