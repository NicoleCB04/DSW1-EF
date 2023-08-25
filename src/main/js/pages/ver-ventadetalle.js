import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import client from '../client';

const VerVentaDetallePage = () => {
    const { id } = useParams();
    const [detalleVenta, setDetalleVenta] = useState({});
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        client({
            method: 'GET',
            path: `/api/ventadetalles/${id}`
        }).done(response => setDetalleVenta(response.entity));

        client({
            method: 'GET',
            path: '/api/productos'
        }).done(response => setProductos(response.entity._embedded.productos));
    }, [id]);

    return (
        <div>
            <h1>Detalle de Venta</h1>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <th>Producto</th>
                        <td>
                            <select
                                id="producto"
                                name="producto"
                                value={detalleVenta.producto ? detalleVenta.producto.id : ''}
                                disabled
                            >
                                {productos.map(producto => (
                                    <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Cantidad</th>
                        <td>{detalleVenta.cantidad}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{detalleVenta.total}</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <Link to={`/editar-ventadetalle/${id}`}>Editar Detalle</Link> |
            <Link to="/">Volver</Link>
        </div>
    );
};

export default VerVentaDetallePage;
