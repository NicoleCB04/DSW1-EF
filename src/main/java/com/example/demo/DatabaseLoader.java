package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final VentaRepository repositoryV;
	private final ProductoRepository repositoryP;
	private final VentaDetalleRepository repositoryD;

	@Autowired
	public DatabaseLoader(
		VentaRepository repositoryV,
		ProductoRepository repositoryP,
		VentaDetalleRepository repositoryD
		) {
		this.repositoryV = repositoryV;
		this.repositoryP = repositoryP;
		this.repositoryD = repositoryD;
	}

	@Override
	public void run(String... strings) throws Exception {

		Producto producto1 = new Producto("Teclado gamer k50", 325);
        Producto producto2 = new Producto("Audifonos G365", 550);
		Producto producto3 = new Producto("Mouse LG 25", 125);
		repositoryP.save(producto1);
        repositoryP.save(producto2);
		repositoryP.save(producto3);

		Venta venta1 = new Venta(125);
        Venta venta2 = new Venta(550);
		Venta venta3 = new Venta(325);
		repositoryV.save(venta1);
        repositoryV.save(venta2);
		repositoryV.save(venta3);

		VentaDetalle ventaDetalles1 = new VentaDetalle(venta1, producto3, 2);
		VentaDetalle ventaDetalles2 = new VentaDetalle(venta2, producto2, 1);
		VentaDetalle ventaDetalles3 = new VentaDetalle(venta3, producto1, 3);
		repositoryD.save(ventaDetalles1);
        repositoryD.save(ventaDetalles2);
        repositoryD.save(ventaDetalles3);


	}
}