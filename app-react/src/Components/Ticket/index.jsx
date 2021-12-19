import React from 'react'
import {useState, useEffect} from "react";

export const Ticket = ({buys}) => {
    console.log("TICKET BUYS: ",buys);
    var totalTicket=0;
    const [viewButton, setViewButton] = useState(true);
    const [reload, setReload] = useState(true);
    const handleClickButton = () => {
        console.log("CLICK BUTTON")
        setViewButton(false);
        setReload(true);
    }

    const myButton = () => {
        console.log("MYBUTTON")
        return(
            <button type="button" class="btn btn-primary" onClick={() => handleClickButton()}>IMPRIMIR</button>
        )
    }
    const handleViewButton = () => {
        return(
            viewButton
                ?
                myButton()
                :
                <></>
        )
    }
    useEffect(() => {
        handleViewButton();
        if(!viewButton){
            window.print()
            setReload(true);
        }
        setReload(false);
    }, [reload])

    return (
        <>
        <h4>TICKET DE VENTA</h4>
        <p>DECORACIONES ANGEL</p>
        <p>     E HIJAS      </p>
        <p className="t_nombre_cli">{buys[0].nombreCli}</p>
            <table>
                <thead>
                    <tr>
                        <th>CANT</th>
                        <th>PRODUCTO</th>
                        <th>€</th>
                        <th>€€</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        buys.map((buy) => {
                            totalTicket=totalTicket+buy.total
                            return(
                                <tr>
                                    <td>{buy.cantidad}</td>
                                    <td>{buy.nombreArt}</td>
                                    <td>{buy.precio+"€"}</td>
                                    <td>{buy.total+"€"}</td>
                                </tr>
                            )
                        })
                    }
                    <br />
                    <tr>
                                    <td></td>
                                    <td></td>
                                    <td>TOTAL</td>
                                    <td>{totalTicket+"€"}</td>
                                </tr>
                </tbody>
            </table>
            <br />
            <span>GRACIAS POR SU COMPRA!!</span>
            <br />
            {handleViewButton()}
            
            
        </>
    )
}
