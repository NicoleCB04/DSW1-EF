const React = require('react');
const { Link, useParams } = require('react-router-dom');
const { useState, useEffect } = require('react');
const client = require('../client');

const VerVentaDetallePage = () => {

    let { id } = useParams();
    const [ventaDetalle, setVentaDetalle] = useState({});

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/ventadetalles/' + id
        }).done(response => setVentaDetalle(response.entity));
    }, [id]);

    return (
        <>
            <h1>Ver Detalle de Venta</h1>

            <table>
                <tr>
                    <th>Producto</th>
                    <td>{ventaDetalle.producto && ventaDetalle.producto.nombre}</td>
                </tr>
                <tr>
                    <th>Cantidad</th>
                    <td>{ventaDetalle.cantidad}</td>
                </tr>
            </table>

            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = VerVentaDetallePage;
