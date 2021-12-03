import React from 'react'

export const Create = ({onInsert}) => {
    console.log('HOLAA');
    return (
        <>
        <h1 className="text-center">Crear cliente</h1>
            <form className="form-padding border border-dark div-form" >
                <div className="form-group">
                    <label for="last_name">Código</label>
                    <input type="text" className="form-control" id="cod_cliente" name="cod_cliente" value=""/>
                </div>
                <div className="form-group">
                    <label for="first_name">Nombre</label>
                    <input type="text" className="form-control" id="nombre_c" name="nombre_c" o value=""/>
                </div>

                <div className="form-group">
                    <label for="last_name">Apellidos</label>
                    <input type="text" className="form-control" id="apellidos_c" name="apellidos_c" value=""/>
                </div>

                <div className="form-group">
                    <label for="last_name">Dirección</label>
                    <input type="text" className="form-control" id="direccion_c" name="direccion_c" value=""/>
                </div>
                <div className="form-group">
                    <label for="last_name">Debe</label>
                    <input type="text" className="form-control" id="debe" name="debe" value=""/>
                </div>
                <div className="form-group">
                    <label for="last_name">Teléfono</label>
                    <input type="text" className="form-control" id="telefono_c" name="telefono_c" value=""/>
                </div>
                <div className="form-group">
                    <label for="last_name">email</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" value=""/>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">CREAR</button>
            </form>
        </>
    )
}
