import './App.css';
import {useState, useEffect} from "react";
import {Login} from './Components/Login'
import {ClientList} from './Components/ClientList'
import bd from './services/services'

function App() {
  const [loged, setLoged] = useState(false);
  const [loginData, setLoginData] = useState({
    name: '',
    pass: ''
  });
  const [codUser, setCodUser] = useState(null);
  const [reload, setReload] = useState(true);

  const handleLogin = (nombre, passwd) =>{
    //añado los datos al login
    setLoginData({
      name: nombre,
      pass: passwd
    })
    console.log("Login data:",loginData)
    if(loginData.name && loginData.pass){
      console.log("LLENo")
      bd.aGetTrabajadorForLogin(loginData.name, loginData.pass).then((res) => {
        console.log(res.data[0].cod_user);
        //si el data me trae resultados
        if(res.data.length > 0){
          //meto el cod_user 
          setCodUser(res.data[0].cod_user);
          //digo que esta logeado
          setLoged(true);
        }else{
          console.log('LOGIN INCORRECTO');
        }
      });
    }
    
    setReload(true);
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
