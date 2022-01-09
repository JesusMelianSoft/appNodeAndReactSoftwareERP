import React from 'react'
import bd from '../../services/services'
import {useState, useEffect} from "react";



export const Stats = ({buys}) => {
    const initialBuys =  null;
    const [allBuys, setAllbuys] = useState(buys);
    const [reload, setReload] = useState(true);
    const anios = [];
    var totalYear = {
        enero: '',
        febrero: '',
        marzo: '',
        abril: '',
        mayo: '',
        junio: '',
        julio: '',
        agosto: '',
        septiembre: '',
        octubre: '',
        noviembre: '',
        diciembre: ''
    }
    
    useEffect(() => {
        setAllbuys(buys);
        setReload(false);
        console.log("useEffect allBuys: ",allBuys);
        //le paso una variable, si esta a true, recarga, y si no no recarga
    }, reload);

    return (
        <>
        {
            allBuys.map((buy) => {
                var i = 0;
                if (buy.fechaCom.substring(0,4)) {
                    if(anios[i] !== buy.fechaCom.substring(0,4)){
                        anios.push(buy.fechaCom.substring(0,4))
                    }
                }
                
            })
        }

            {anios.map((anio) => {
                {console.log(anio)}
                return(
                    <div>
                        <h3>{anio}</h3>
                        <table className="table table-striped" title={anio}>
                            <thead>
                                <tr className="bg-dark text-light">
                                    <th>#</th>
                                    <th colspan="2">David</th>
                                    <th colspan="2">Tienda</th>
                                    <th colspan="2">Bego</th>
                                    <th colspan="2">BegoJimenez</th>
                                    <th>Acciones</th>
                                </tr>
                                <tr className="bg-dark text-light">
                                    <th>#</th>
                                    <th>VENTAS</th>
                                    <th>COBROS</th>
                                    <th>VENTAS</th>
                                    <th>COBROS</th>
                                    <th>VENTAS</th>
                                    <th>COBROS</th>
                                    <th>VENTAS</th>
                                    <th>COBROS</th>
                                    <th colspan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBuys.map((buy) => {
                                    var total = 0;
                                    if (buy.cod_user===1) {
                                        if(buy.fechaCom.substring(0,4) ===anio){
                                            if(buy.fechaCom.substring(5,6)){

                                            }
                                        }
                                    }
                                })}

                                {console.log("anios: ", anios)}
                            </tbody>
                        </table>
                    </div>
                )
            })}
            
        </>
    )
}
