const React = require('react');
const ReactDOM = require('react-dom');
const {createBrowserRouter, RouterProvider} = require('react-router-dom');

const HomePage = require('./pages/home');
const NuevoProductoPage = require('./pages/nuevo-producto');
const VerVentaPage = require('./pages/ver-venta');
const NuevaVentaPage = require('./pages/nueva-venta');
const VerProductoPage = require('./pages/ver-producto');
const EditarVentaPage = require('./pages/editar-venta');
const VerVentaDetallePage = require('./pages/ver-ventadetalle');
const EditarProductoPage = require('./pages/editar-producto');



const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/ver-venta/:id', element: <VerVentaPage /> },
	{ path: '/nueva-venta', element: <NuevaVentaPage /> },
	{ path: '/ver-producto/:id', element: <VerProductoPage /> },
	{ path: '/nuevo-producto', element: <NuevoProductoPage /> },
	{ path: '/editar-producto/:id', element: <EditarProductoPage /> },
	{ path: '/editar-venta/:id', element: <EditarVentaPage /> },
	{ path: '/ver-ventadetalle/:id', element: <VerVentaDetallePage /> },
	
])


ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById('react'))
