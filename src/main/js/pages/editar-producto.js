const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useParams } = require('react-router-dom');
const client = require('../client');

const EditarProductoPage = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const { id } = useParams();

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/productos/' + id
        }).done(response => {
            const producto = response.entity;
            setNombre(producto.nombre);
            setPrecio(producto.precio);
        });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: 'PATCH',
            path: '/api/productos/' + id,
            entity: { nombre: nombre, precio: parseFloat(precio) },
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    };

    return (
        <>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label> <br />
                <input type="text" id="nombre" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} /> <br />
                <label>Precio</label> <br />
                <input type="number" id="precio" name="precio" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} /> <br />
                <input type="submit" value="Editar Producto" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = EditarProductoPage;
