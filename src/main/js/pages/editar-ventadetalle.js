const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useParams } = require('react-router-dom');
const client = require('../client');

const EditarVentaDetallePage = () => {
    const [cantidad, setCantidad] = useState('');
    const { id } = useParams();

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/ventadetalles/' + id
        }).done(response => {
            const detalleVenta = response.entity;
            setCantidad(detalleVenta.cantidad);
        });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const nuevoDetalleVenta = {
            cantidad: parseFloat(cantidad)
        };

        client({
            method: 'PATCH',
            path: '/api/ventadetalles/' + id,
            entity: nuevoDetalleVenta,
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    };

    return (
        <>
            <h1>Editar Detalle de Venta</h1>
            <form onSubmit={handleSubmit}>
                <label>Cantidad</label> <br />
                <input type="number" id="cantidad" name="cantidad"  value={cantidad} onChange={(e) => setCantidad(parseFloat(e.target.value))} /> <br />
                <input type="submit" value="Editar Detalle de Venta" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = EditarVentaDetallePage;
