const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useParams } = require('react-router-dom');
const client = require('../client');

const VerVentaDetallePage = () => {
    const { id } = useParams();
    const [detalleVenta, setDetalleVenta] = useState({});
    const [venta, setVenta] = useState({});

    useEffect(() => {
        client({
            method: 'GET',
            path: `/api/ventadetalles/${id}`
        }).done(response => setDetalleVenta(response.entity));

        client({
            method: 'GET',
            path: '/api/ventas'
        }).done(response => {
            const ventaEncontrada = response.entity._embedded.ventas.find(venta => venta._links.ventadetalles.href.includes(id));
            setVenta(ventaEncontrada);
        });
    }, [id]);

    return (
        <>
            <h1>Detalle de Venta</h1>
            <hr/>
            <table border="1">
                <tbody>
                    <tr>
                        <th>Producto</th>
                        <td>{detalleVenta.producto && detalleVenta.producto.nombre}</td>
                    </tr>
                    <tr>
                        <th>Cantidad</th>
                        <td>{detalleVenta.cantidad}</td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <h2>Venta</h2>
            <hr/>
            <table border="1">
                <thead>
                    <tr>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{venta.total}</td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = VerVentaDetallePage;
