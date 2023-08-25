const React = require('react');
const { useState } = require('react');
const { Link } = require('react-router-dom');
const client = require('../client');

const NuevaVentaPage = () => {

    const [total, setTotal] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: 'POST',
            path: '/api/ventas',
            entity: { total: parseFloat(total) },
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    };

    return (
        <>
            <h1>Nueva Venta</h1>
            <form onSubmit={handleSubmit}>
                <label>Total</label> <br />
                <input type="number" id="total" name="total" step="0.01" onChange={e => setTotal(e.target.value)} /> <br />
                <input type="submit" value="Nueva Venta" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = NuevaVentaPage;