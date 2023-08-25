const React = require('react');
const { useState, useEffect } = require('react');
const { Link } = require('react-router-dom');
const client = require('../client');

const NuevoVentaDetallePage = () => {

    const [ventas, setVentas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [ventaId, setVentaId] = useState('');
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/ventas'
        }).done(response => setVentas(response.entity._embedded.ventas));

        client({
            method: 'GET',
            path: '/api/productos'
        }).done(response => setProductos(response.entity._embedded.productos));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: 'POST',
            path: '/api/ventadetalles',
            entity: {
                venta: `/api/ventas/${ventaId}`,
                producto: `/api/productos/${productoId}`,
                cantidad: parseInt(cantidad)
            },
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    };

    return (
        <>
            <h1>Nuevo Detalle de Venta</h1>
            <form onSubmit={handleSubmit}>
                <label>Venta</label> <br />
                <select id="ventaId" name="ventaId" onChange={e => setVentaId(e.target.value)}>
                    <option value="">Seleccione una venta</option>
                    {ventas.map(venta => (
                        <option key={venta._links.self.href} value={venta.id}>{venta.id}</option>
                    ))}
                </select> <br />
                <label>Producto</label> <br />
                <select id="productoId" name="productoId" onChange={e => setProductoId(e.target.value)}>
                    <option value="">Seleccione un producto</option>
                    {productos.map(producto => (
                        <option key={producto._links.self.href} value={producto.id}>{producto.nombre}</option>
                    ))}
                </select> <br />
                <label>Cantidad</label> <br />
                <input type="number" id="cantidad" name="cantidad" onChange={e => setCantidad(e.target.value)} /> <br />
                <input type="submit" value="Nuevo Detalle de Venta" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = NuevoVentaDetallePage;
