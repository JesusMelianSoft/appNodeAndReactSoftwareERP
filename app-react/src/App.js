import './App.css';
import {useState, useEffect} from "react";
import {Login} from './Components/Login'
import {ClientList} from './Components/ClientList'
import bd from './services/services'
import { NavBar } from './Components/NavBar';
import { Create } from './Components/ClientForm/Create';
import { Edit} from './Components/ClientForm/Edit';
import { Pago } from './Components/ClientForm/Pago';
import { Compra } from './Components/ClientForm/Compra';
import { PaysList} from './Components/PaysList';
import { BuysList} from './Components/BuysList';
import { Ticket } from './Components/Ticket'

function App() {
  const [loged, setLoged] = useState(false);
  const [codUser, setCodUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [action, setAction] = useState(0);
  const [codClient, setCodClient] = useState();
  const [clients, setClients] = useState();
  const [client, setClient] = useState();
  const [totalTaco, setTotalTaco] = useState(null);
  const [pagosByClient, setPagosByClient] = useState();
  const [buysByUser, setBuysByUser] = useState();
  const [paysWeek, setPaysWeek] = useState();
  const [buysWeek, setBuysWeek] = useState();
  const [lastBuys, setLastBuys] = useState();
  const [buysForTicket, setBuysForTicket] = useState();

  //PARA COMPROBAR EL LOGIN
  const handleLoged = (bool, cod_user) => {
    setCodUser(cod_user);
    console.log('handleloged codUser: ' + codUser);
    //CARGO TODOS LOS CLIENTES
    handleGetAllClientByUser(codUser);
    setLoged(bool);
    setReload(true);
  }

  //PARA DESLOGEAR UN USUARIOS
  const handleUnLogin = () => {
    setLoged(false);
    setReload(true);
  }
  //PARA CAMBIAR DE UN FORMULARIO A OTRO
  const handleAction = (action, cod_client) => {
    if(action === 1){
      handleEditClient(cod_client);
    }
    //REINICIAMOS SALVO CADA VEZ QUE BUSCO UN REGISTRO
    if(action!=0){
      setReload(true);
    }
    setCodClient(cod_client)
    setAction(action);
    console.log("CAMBIAMOS LO ANTERIOR")
    
  }


  const handleEditClient = (cod_client) => {
    setCodClient(cod_client);
    setReload(true);
  }

  //BORRAR CLIENTE
  const handleDeleteClient = (cod_client, cod_user) => {
    const confirm = window.confirm("¿Está seguro que desea eliminar el registro con cod: "+cod_client+"?");
      if(confirm){
        bd.delClientByCod(cod_client, cod_user).then((res) => {
          window.alert("Registro con cod: "+ cod_client+ " eliminado correctamente");
        })
        setReload(true);
      }
    }

    //BORRAR PAGO
  const handleDeletePay = (cod_pago, cod_user) => {
    const confirm = window.confirm("¿Está seguro que desea eliminar el registro con cod: "+cod_pago+"?");
      if(confirm){
        bd.delPayByCod(cod_pago, cod_user).then((res) => {
          window.alert("Registro con cod: "+ cod_pago + " eliminado correctamente");
        })
        setReload(true);
      }
    }

      //BORRAR COMPRA
  const handleDeleteBuy = (cod_compra, cod_user) => {
    const confirm = window.confirm("¿Está seguro que desea eliminar el registro con cod: "+cod_compra+"?");
      if(confirm){
        bd.delBuyByCod(cod_compra, cod_user).then((res) => {
          window.alert("Registro con cod: "+ cod_compra + " eliminado correctamente");
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

  const handleGetPaysWeek = (cod_user) => {
    bd.aGetPaysWeek(cod_user).then((res) => {
      console.log(res.data);
      //meto los actores en el array de actores
      setPaysWeek(res.data);
      })
  setReload(true);
  }


  const handleGetBuysWeek = (cod_user) => {
    bd.aGetBuysWeek(cod_user).then((res) => {
      console.log(res.data);
      //meto los actores en el array de actores
      setBuysWeek(res.data);
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
    const finalClient = {
      cod_cliente: client.cod_cliente,
      nombre_c: client.nombre_c,
      apellidos_c: client.apellidos_c,
      direccion_c: client.direccion_c,
      telefono_c: client.telefono_c,
      email: client.email,
      debe: client.debe,
      cod_user: codUser
    }
    bd.aInsertClient(finalClient).then((res) => {
      console.log("SE HA INSERTADO CORRECTAMENTE")
    })
    setReload(true);
  }

  //FILTRO UN PAGO POR CLIENTE Y TRABAJADOR
  const handleFilterPay = (cod_client, cod_user) => {
    const filtrar= (cod_client, cod_user) => {
      const result = pagosByClient.filter(pagos => {return pagos.cod_cliente_p === cod_client && pagos.cod_user === cod_user});
      //console.log('Result:', result);
      return result;
    }
    const myPays = filtrar(cod_client, cod_user);
    console.log("handleFilterPay",myPays);
    //setReload(true);
    return myPays;
    
  }

  //OBTENGO TODOS LOS PAGOS DE UN TRABAJADOR
  const handleGetPaysByUser = (cod_user) => {
    bd.aGetPayByUser(cod_user).then((res) => {
      console.log("aGetPayByUser", res.data);
      setPagosByClient(res.data)
    })
  }

  //OBTENGO LAS ULTIMAS COMPRAS DEL TRABAJADOR
  const handleGetLastBuysByUser = (cod_user) => {
    bd.aGetLastBuyByUser(cod_user).then((res) => {
        console.log("aGetLastBuysByUser", res.data);
        setLastBuys(res.data);
    })
}

  //FILTRO UNA COMPRA POR CLIENTE Y TRABAJADOR
  const handleFilterBuy = (cod_client, cod_user) => {
    const filtrar= (cod_client, cod_user) => {
      const result = buysByUser.filter(compras => {return compras.codCli === cod_client && compras.cod_user === cod_user});
      //console.log('Result:', result);
      return result;
    }
    const myBuys = filtrar(cod_client, cod_user);
    console.log("handleFilterBuy",myBuys);
    //setReload(true);
    return myBuys;
    
  }

    //FILTRO UNA COMPRA POR CLIENTE Y TRABAJADOR
    const handleFilterLastBuy = (cod_client, cod_user) => {
      console.log("handleFilterBuy cod_client",cod_client, " cod_user: ",cod_user);
      
      const filtrar= (cod_client, cod_user) => {
        const result = lastBuys.filter(compras=> {return compras.codCli === cod_client && compras.cod_user === cod_user});
        //console.log('Result:', result);
        return result;
      }
      const myBuys = filtrar(cod_client, cod_user);
      //setReload(true);
      return myBuys;
      
    }
  
  //OBTENGO LAS COMPRAS DE UN TRABAJADOR TRABAJADOR
  const handleGetBuysByUser = (cod_user) => {
    bd.aGetBuyByUser(cod_user).then((res) => {
      console.log("aGetPayByUser", res.data);
      setBuysByUser(res.data)
    })
  }
  //OBTENGO EL TOTAL DEL TACO
  const handleGetDebeClient = () => {
    bd.aGetDebeClients(codUser).then((res) => {
      setTotalTaco(res.data[0].suma);
    })
  }


  //INSERTAR PAGOS
  const handleInsertPay = (pay) => {
    bd.aInsertPay(pay).then((res) => {
      window.alert("PAGO INSERTADO");
    }).catch((err) => {
      console.log(err);
      window.alert("PAGO NO INSERTADO");
    })
    //recargo la pagina
    setReload(true);
  }

  //INSERTAR COMPRAS
  const handleInsertBuy = (buy) => {
    console.log(client);
    bd.aInsertBuy(buy).then((res) => {
      window.alert("COMPRA INSERTADA")
    })
    setReload(true);
  }
  //BUSQUEDA CLIENTES 
  const handleSearch = (data) => {
    console.log("MIS DATOS: ",data);
    bd.aSearchClients(codUser, data).then((res) => {
      console.log("res data seacrh:",res.data);
      //setClients({});
      setClients(res.data);
    })
    //No puedo recargar la página por q sino vuelven a ponerse los clientes por defecto
    //setReload(true);
  }

  //FILTRO UN CLIENTE POR CODDE TRABAJADOR Y POR SU CODIGO DE CLIENTE
  const handleFilterEdit = (cod_client, cod_user) => {
    const filtrarCodCli = (cod_client, cod_user) => {
      const result = clients.filter(clients => {return clients.cod_cliente === cod_client && clients.cod_user === cod_user});
      //console.log('Result:', result);
      return result[0];
    }
  const myClient = filtrarCodCli(cod_client, cod_user);
  return myClient;
  }

  //RESETEAR PAGPOS Y COMPRAS DE LA SEMANA
  const handleReset = (cod_user) => {
    bd.aResetBuys(cod_user);
    bd.aResetPays(cod_user);
    setReload(true);
  }

  const handleBuysForTicket = (buysForTicket) => {
    setBuysForTicket(buysForTicket);
    setAction(7);
    setReload(true);
  }
    //CARGAR LOS FORMULARIOS DEPENDIENDO DE LA ACCION
    const handleComponent = () => {
      console.log(action);
      if(action === 0){
        return(<Create onInsert={handleInsert} />);
      }else if(action === 1){
        const myClient = handleFilterEdit(codClient, codUser);
        return(<Edit myClient={myClient} onEdit={handleEdit} />);
      }else if(action === 2){
        const myClient = handleFilterEdit(codClient, codUser);
        const pagos=handleFilterPay(codClient, codUser);
        
        return(<Pago cliente={myClient} pagos={pagos} onInsertPay={handleInsertPay} cod_user={codUser}/>);
      }else if(action === 3){
        const myClient = handleFilterEdit(codClient, codUser);
        const compras=handleFilterBuy(codClient, codUser);
        const ultCompra=handleFilterLastBuy(codClient, codUser);

        return(<Compra compras={compras} client={myClient} onInsertBuy={handleInsertBuy} ultCompra={ultCompra} onAction={handleAction} onTicket={handleBuysForTicket} />);
      }
  
    }

    const handleList = () => {
      if(action===5){
        return(<PaysList unLogin={handleUnLogin} onAction={handleAction} pays={pagosByClient} onDelete={handleDeletePay}/>);
      }else if(action === 6){
        return(<BuysList unLogin={handleUnLogin} onAction={handleAction} buys={buysByUser} onDelete={handleDeleteBuy} />)
      }else if(action === 7){
        return(<Ticket buys={buysForTicket} />)
      }
      else {
        console.log("MI ACTION ES 0");
        return(<ClientList onAction={handleAction} onDelete={handleDeleteClient} cod_user={codUser} clients={clients} unLogin={handleUnLogin} total={totalTaco} onSearch={handleSearch} paysWeek={paysWeek} buysWeek={buysWeek} onReset={handleReset} />); 
      }
    }

  //ESTO SIRVE PARA QUE SE CARGE LA PRIMERA VEZ
  useEffect(() => {
    console.log('useEffect, LOGED: ',loged);
    console.log('useEffect, coduser: ',codUser);
    handleGetAllClientByUser(codUser);
    handleGetDebeClient();
    handleGetPaysByUser(codUser);
    handleGetBuysByUser(codUser);
    handleGetBuysWeek(codUser);
    handleGetPaysWeek(codUser);
    handleGetLastBuysByUser(codUser);
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
    //AQUI IRIA LA BARRA DE HERRAMIENTAS
      <div className="d-flex">
        <div className="scrolling" >
          {handleList()}
        </div>
        <div className="flex-sm-row col-sm-3 p-2 ">
          {handleComponent()}
        </div>
      </div>}
    </>
  );
}

export default App;
