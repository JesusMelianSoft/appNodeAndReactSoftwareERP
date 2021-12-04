import './App.css';
import {useState, useEffect} from "react";
import {Login} from './Components/Login'
import {ClientList} from './Components/ClientList'
import bd from './services/services'
import { NavBar } from './Components/NavBar';
import { Create } from './Components/ClientForm/Create';
import { Edit} from './Components/ClientForm/Edit';

function App() {
  const [loged, setLoged] = useState(false);
  const [codUser, setCodUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [action, setAction] = useState(0);
  const [codClient, setCodClient] = useState();
  const [clients, setClients] = useState();
  const [client, setClient] = useState();

  //PARA COMPROBAR EL LOGIN
  const handleLoged = (bool, cod_user) => {
    setCodUser(cod_user);
    console.log('handleloged codUser: ' + codUser);
    //CARGO TODOS LOS CLIENTES
    handleGetAllClientByUser(codUser);
    setLoged(bool);
    setReload(true);
  }
  //PARA CAMBIAR DE UN FORMULARIO A OTRO
  const handleAction = (action, cod_client) => {
    if(action === 1){
      handleEditClient(cod_client);
    }
    setCodClient(cod_client)
    setAction(action);
    setReload(true);
  }

  
  const handleEditClient = (cod_client) => {
    setCodClient(cod_client);
    setReload(true);
  }

  //BORRAR CLIENTE
  const handleDeleteClient = (cod_client) => {
    const confirm = window.confirm("¿Está seguro que desea eliminar el registro con cod: "+cod_client+"?");
      if(confirm){
        bd.delClientByCod(cod_client).then((res) => {
          window.alert("Registro con cod: "+ cod_client+ " eliminado correctamente");
        })
        setReload(true);
      }
    }

    //OBTENER TODOS LOS CLIENTES DE UN TRABAJADOR
    const handleGetAllClientByUser = (cod_user) => {
      console.log("COD USER PARA BUSCAR CLIENTES: "+cod_user)
          bd.aGetClients(cod_user).then((res) => {
          console.log(res.data);
          //meto los actores en el array de actores
          setClients(res.data);
          })
      setReload(true);
  }


  //EDITAR CLIENTE
  const handleEdit = (client) => {
    console.log('handleEdit myclient',client);
    bd.aPutClient(client).then((res) => {
      console.log('res.data 2',res.data);
      window.alert("CLIENTE EDITADO CORRECTAMENTE");
    })
    //cambio la accion a crear
    handleAction(0);
    //RECARGO LA PAGINA
    setReload(true);
  }

  //INSERTAR CLIENTE
  const handleInsert = (client) => {

  }

  //CARGAR LOS FORMULARIOS DEPENDIENDO DE LA ACCION
  const handleComponent = () => {
    console.log(action);
    if(action === 0){
      console.log('action 0');
      return(<Create />);
    }else if(action === 1){
      console.log('handleComponentEdit: ',client)
      return(<Edit clients={clients} cod_user={codUser} cod_client={codClient} onEdit={handleEdit}/>);
    }
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
    { !loged 
    ? 
      <Login onLogin={handleLoged}/> 
    : 
      <div className="d-flex">
        <div className="scrolling" >
          <ClientList onAction={handleAction} onDelete={handleDeleteClient} cod_user={codUser} clients={clients}/> 
        </div>
        <div className="flex-sm-row col-sm-3 p-2 ">
          {handleComponent()}
        </div>
      </div>}
    </>
  );
}

export default App;
