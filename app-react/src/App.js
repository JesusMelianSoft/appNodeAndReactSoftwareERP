import './App.css';
import {useState, useEffect} from "react";
import {Login} from './Components/Login'
import {ClientList} from './Components/ClientList'
import bd from './services/services'
import { NavBar } from './Components/NavBar';


function App() {
  const [loged, setLoged] = useState(false);
  const [codUser, setCodUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [action, setAction] = useState(0);
  const [codClient, setCodClient] = useState();
  const [clients, setClients] = useState();

  const handleLoged = (bool, cod_user) => {
    setCodUser(cod_user);
    console.log('handleloged codUser: ' + codUser);
    //CARGO TODOS LOS CLIENTES
    handleGetAllClientByUser(codUser);
    setLoged(bool);
    setReload(true);
  }
  const handleAction = (action, cod_client) => {
    setCodClient(cod_client)
    setAction(action);
    setReload(true);
  }

  const handleDeleteClient = (cod_client) => {
    const confirm = window.confirm("¿Está seguro que desea eliminar el registro con cod: "+cod_client+"?");
      if(confirm){
        bd.delClientByCod(cod_client).then((res) => {
          window.alert("Registro: ", res.data, " eliminado correctamente");
        })
      }
    }
  
    const handleGetAllClientByUser = (cod_user) => {
      console.log("COD USER PARA BUSCAR CLIENTES: "+cod_user)
          bd.aGetClients(cod_user).then((res) => {
          console.log(res.data);
          //meto los actores en el array de actores
          setClients(res.data);
          })
      
  }

  
  //ESTO SIRVE PARA QUE SE CARGE LA PRIMERA VEZ
  useEffect(() => {
    console.log('useEffect, LOGED: ',loged);
    console.log('useEffect, coduser: ',codUser);
    handleGetAllClientByUser(codUser);
    setReload(false);
    //le paso una variable, si esta a true, recarga, y si no no recarga
  }, [reload]);
  
  return (
    <>
    <NavBar title="DECORACIONES ANGEL E HIJAS"/>
    { !loged ? <Login onLogin={handleLoged}/> : <div className="d-flex"><div className="scrolling" ><ClientList onAction={handleAction} onDelete={handleDeleteClient} cod_user={codUser} clients={clients}/> </div></div>}
    </>
  );
}

export default App;
