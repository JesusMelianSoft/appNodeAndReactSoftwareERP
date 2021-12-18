import React from 'react'

export const BuysList = ({unLogin, onAction, buys, onDelete}) => {
    //OBTENGO TODOS LOS CLIENTES DE CADA EMPLEADO
    var data;
    const handleInputChange = (event) => {
        data=event.target.value
        console.log("busqueda: "+data);
        //onSearchbuy(data);
    }
    return (
        <>
        
        <div className="search_box">
        <button type="button" className="btn btn-danger m-2" onClick={unLogin}>CERRAR SESIÓN</button>
            <form action="onSearch">
                <label>BUSCAR:</label>
                <br />
                <input type="text" placeholder="Introduzca un nombre o un codigo" onChange={handleInputChange} value={data}/>
                <button type="button" className="btn btn-success m-2" onClick={() => {onAction(0,null)}}>CLIENTES</button>
                <button type="button" className="btn btn-success m-2" onClick={() => {onAction(5,null)}}>PAGOS</button>            
            </form>
        </div>
        <br />
        <h1 className="text-center">Listado de Clientes</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="bg-dark text-light">
                        <th>#</th>
                        <th>Cod cliente</th>
                        <th>Nombre y Apellidos</th>
                        <th>Nombre articulo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Fecha Compra</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            buys.map((buy) => {
                                var fecha;
                                //A veces la fecha es nulo osea que debo hacer esto:
                                if(buy.fechaCom != null) {
                                    fecha = buy.fechaCom;
                                    fecha = fecha.substring(0,10);
                                }else{
                                    fecha="null";
                                }
                                
                                console.log("FECHA PAGO: ",buy.fechaCom)
                                return(
                                    <tr>
                                        <td key={buy.codCom}>{buy.codCom}</td>
                                        <td>{buy.codCli}</td>
                                        <td>{buy.nombreCli+" "+buy.apellidosCli}</td>
                                        <td>{buy.nombreArt}</td>
                                        <td>{buy.precio}</td>
                                        <td>{buy.cantidad}</td>
                                        <td>{buy.total}</td>
                                        <td>{fecha.substring(0,10)}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" id={buy.codCom} onClick={() => onDelete(buy.codCom, buy.cod_user)}>BORRAR</button>
                                        </td>
                                    </tr>                    
                                );
                            })
                        }
                    </tbody>
            </table>
        </>
    )
}
