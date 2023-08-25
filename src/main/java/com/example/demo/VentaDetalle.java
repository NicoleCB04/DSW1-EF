package com.example.demo;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class VentaDetalle {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    private Venta id_venta;

    @ManyToOne
    private Producto id_producto;

    private int cantidad;

    private VentaDetalle() {}

    public VentaDetalle(Venta id_venta, Producto id_producto, int cantidad) {
        this.id_venta = id_venta;
        this.id_producto = id_producto;
        this.cantidad = cantidad;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VentaDetalle that = (VentaDetalle) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "VentaDetalle{" +
                "id=" + id +
                ", id_venta=" + id_venta +
                ", id_producto=" + id_producto +
                ", cantidad=" + cantidad +
                '}';
    }

    public int getId() {
        return id;
    }

    public Venta getId_venta() {
        return id_venta;
    }

    public void setId_venta(Venta id_venta) {
        this.id_venta = id_venta;
    }

    public Producto getId_producto() {
        return id_producto;
    }

    public void setId_producto(Producto id_producto) {
        this.id_producto = id_producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
