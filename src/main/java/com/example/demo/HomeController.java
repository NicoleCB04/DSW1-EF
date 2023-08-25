package com.example.demo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
///import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

    @GetMapping(path = "/api/ventadetalles/{id}/detalles")
    public @ResponseBody List<Map<String, Object>> obtenerDetallesVenta(@PathVariable Integer id) {
        String sql = "SELECT producto.id as PRODUCTO_ID, producto.nombre as PRODUCTO_NOMBRE, ventadetalle.cantidad as CANTIDAD FROM ventadetalle "
                + "JOIN producto ON ventadetalle.id_producto = producto.id WHERE ventadetalle.id_venta = ?";
        List<Map<String, Object>> queryResult = jdbcTemplate.queryForList(sql, id);
        return queryResult;
    }

	/**
	 * 
	 * 
	 * 
	 * 
	 */

}