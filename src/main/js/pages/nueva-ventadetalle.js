const React = require('react');
const { useState, useEffect } = require('react');
const { Link } = require('react-router-dom');
const client = require('../client');

const NuevoVentaDetallePage = () => {
    const [productos, setProductos] = useState([]);
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/productos'
        }).done(response => setProductos(response.entity._embedded.productos));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const nuevoDetalleVenta = {
            producto: `/api/productos/${productoId}`,
            cantidad: parseInt(cantidad)
        };

        client({
            method: 'POST',
            path: '/api/ventadetalles',
            entity: nuevoDetalleVenta,
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    };

    return (
        <>
            <h1>Nuevo Detalle de Venta</h1>
            <form onSubmit={handleSubmit}>
                <label>Producto</label> <br />
                <select id="producto" name="producto" value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                    <option value="">Seleccione un producto</option>
                    {productos.map(producto => (
                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                    ))}
                </select> <br />
                <label>Cantidad</label> <br />
                <input type="number" id="cantidad" name="cantidad" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} /> <br />
                <input type="submit" value="Nuevo Detalle de Venta" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = NuevoVentaDetallePage;
