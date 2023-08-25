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
        String sql = "SELECT ventas.id as ID, ventas.total as TOTAL, ventas.fecha as FECHA FROM ventas WHERE ventas.id_usuario = ?";
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