const React = require('react');
const {useState} = require('react');
const { Link } = require('react-router-dom');
const client = require('../client');




const NuevoProductoPage = () => {

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: 'POST',
            path: '/api/productos',
            entity: { nombre: nombre, precio: parseFloat(precio) },
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    };

    return (
        <>
            <h1>Nuevo Producto</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label> <br />
                <input type="text" id="nombre" name="nombre" onChange={e => setNombre(e.target.value)} /> <br />
                <label>Precio</label> <br />
                <input type="number" id="precio" name="precio" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} /> <br />
                <input type="submit" value="Nuevo Producto" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = NuevoProductoPage;