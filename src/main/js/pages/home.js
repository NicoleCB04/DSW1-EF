const React = require('react');
const { Link } = require('react-router-dom');
const client = require('../client');

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { productos: [], ventas: [], ventadetalles: [] };
    }

    componentDidMount() {
        client({ method: 'GET', path: '/api/productos' }).done(response => {
            this.setState({ productos: response.entity._embedded.productos });
        });

        client({ method: 'GET', path: '/api/ventas' }).done(response => {
            this.setState({ ventas: response.entity._embedded.ventas });
        });

        client({ method: 'GET', path: '/api/ventadetalles' }).done(response => {
            this.setState({ ventadetalles: response.entity._embedded.ventadetalles });
        });
    }

    render() {
        return (
            <>
                <h1>Examen Final</h1>

                <div style={{ "width": "100%", "display": "flex" }}>
                    <div style={{ "width": "calc(100% / 3)" }}>
                        <Titulo entidad="Productos" emoji="🛒" />
                        <ProductoList productos={this.state.productos} />
                        <Link to="/nuevo-producto">Nuevo Producto</Link>
                    </div>
                    <div style={{ "width": "calc(100% / 3)" }}>
                        <Titulo entidad="Ventas" emoji="💰" />
                        <VentaList ventas={this.state.ventas} />
                        <Link to="/nueva-venta">Nueva Venta</Link>
                    </div>
                    <div style={{ "width": "calc(100% / 3)" }}>
                        <Titulo entidad="Detalles de Venta" emoji="📝" />
                        <VentaDetalleList ventadetalles={this.state.ventadetalles} />
                        <Link to="/nuevo-ventadetalle">Nuevo Detalle de Venta</Link>
                    </div>
                </div>
            </>
        );
    }
}

const Titulo = (props) => {
    return (
        <>
            <hr />
            <h2>{props.emoji} - {props.entidad}</h2>
            <hr />
            Lista completa de {props.entidad.toLowerCase()}
        </>
    );
};

class ProductoList extends React.Component {
    render() {
        const productos = this.props.productos.map(producto =>
            <Producto key={producto._links.self.href} producto={producto} />
        );
        return (
            <table border="1">
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                    {productos}
                </tbody>
            </table>
        );
    }
}

class VentaList extends React.Component {
    render() {
        const ventas = this.props.ventas.map(venta =>
            <Venta key={venta._links.self.href} venta={venta} />
        );
        return (
            <table border="1">
                <tbody>
                    <tr>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                    {ventas}
                </tbody>
            </table>
        );
    }
}

class VentaDetalleList extends React.Component {
    render() {
        const ventadetalles = this.props.ventadetalles.map(ventadetalle =>
            <VentaDetalle key={ventadetalle._links.self.href} ventadetalle={ventadetalle} />
        );
        return (
            <table border="1">
                <tbody>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                    {ventadetalles}
                </tbody>
            </table>
        );
    }
}

class Producto extends React.Component {
    render() {
        const id = this.props.producto._links.self.href.split("/").slice(-1);
        return (
            <tr>
                <td>{this.props.producto.nombre}</td>
                <td>{this.props.producto.precio}</td>
                <td>
                    <Link to={"/ver-producto/" + id}>Ver</Link> |
                    <Link to={"/editar-producto/" + id}>Editar</Link>
                </td>
            </tr>
        );
    }
}

class Venta extends React.Component {
    render() {
        const id = this.props.venta._links.self.href.split("/").slice(-1);
        return (
            <tr>
                <td>{this.props.venta.total}</td>
                <td>
                    <Link to={"/ver-venta/" + id}>Ver</Link>

                </td>
            </tr>
        );
    }
}

class VentaDetalle extends React.Component {
    render() {
        const id = this.props.ventadetalle._links.self.href.split("/").slice(-1);
        return (
            <tr>
                <td>{this.props.ventadetalle.id_producto}</td>
                <td>{this.props.ventadetalle.cantidad}</td>
                <td>
                    <Link to={"/ver-ventadetalle/" + id}>Ver</Link> |
                    <Link to={"/editar-ventadetalle/" + id}>Editar</Link>
                </td>
            </tr>
        );
    }
}

module.exports = HomePage;
