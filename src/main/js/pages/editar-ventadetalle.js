const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useParams } = require('react-router-dom');
const client = require('../client');

const EditarVentaDetallePage = () => {
    const [productos, setProductos] = useState([]);
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');
    const { id } = useParams();

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/productos'
        }).done(response => setProductos(response.entity._embedded.productos));

        client({
            method: 'GET',
            path: `/api/ventadetalles/${id}`
        }).done(response => {
            const detalleVenta = response.entity;
            setProductoId(detalleVenta.producto.id);
            setCantidad(detalleVenta.cantidad);
        });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const detalleEditado = {
            producto: `/api/productos/${productoId}`,
            cantidad: parseInt(cantidad)
        };

        client({
            method: 'PATCH',
            path: `/api/ventadetalles/${id}`,
            entity: detalleEditado,
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    };

    return (
        <>
            <h1>Editar Detalle de Venta</h1>
            <form onSubmit={handleSubmit}>
                <label>Producto</label> <br />
                <select id="producto" name="producto" value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                    {productos.map(producto => (
                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                    ))}
                </select> <br />
                <label>Cantidad</label> <br />
                <input type="number" id="cantidad" name="cantidad" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} /> <br />
                <input type="submit" value="Editar Detalle de Venta" />
            </form>
            <Link to={`/ver-ventadetalle/${id}`}>Cancelar</Link>
        </>
    );
};

module.exports = EditarVentaDetallePage;
