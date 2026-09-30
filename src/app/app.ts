import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Producto, ProductosService } from './Productos/service';

import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  imports: [RouterOutlet, NgForOf, NgIf, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
   productos: Producto[] = [];

  nombre = '';
  descripcion = '';
  precio: number | null = null;

  editandoId: number | null = null;

  mensaje = '';
  error = '';

  constructor(private productosService: ProductosService) {}
  // ==========================================
  // AL INICIAR
  // ==========================================

  ngOnInit(): void {
    this.cargarProductos();
  }


  // ==========================================
  // READ
  // ==========================================

  async cargarProductos(): Promise<void> {

    try {

      this.error = '';

      this.productos =
        await this.productosService.obtenerProductos();

    } catch (error: any) {

      this.error = error.message;

    }
  }


  // ==========================================
  // CREATE / UPDATE
  // ==========================================

  async guardar(): Promise<void> {

    try {

      this.error = '';
      this.mensaje = '';

      if (!this.nombre.trim()) {
        this.error = 'El nombre es obligatorio.';
        return;
      }

      if (this.precio === null) {
        this.error = 'El precio es obligatorio.';
        return;
      }


      // ======================================
      // ACTUALIZAR
      // ======================================

      if (this.editandoId !== null) {

        await this.productosService.actualizarProducto(
          this.editandoId,
          this.nombre,
          this.descripcion,
          this.precio
        );

        this.mensaje = 'Producto actualizado correctamente.';

      }

      // ======================================
      // CREAR
      // ======================================

      else {

        await this.productosService.crearProducto(
          this.nombre,
          this.descripcion,
          this.precio
        );

        this.mensaje = 'Producto creado correctamente.';
      }


      this.limpiarFormulario();

      await this.cargarProductos();

    } catch (error: any) {

      this.error = error.message;

    }
  }


  // ==========================================
  // PREPARAR EDICIÓN
  // ==========================================

  editar(producto: Producto): void {

    this.editandoId = producto.id;

    this.nombre = producto.nombre;

    this.descripcion =
      producto.descripcion ?? '';

    this.precio = producto.precio;

    this.mensaje = '';

    this.error = '';
  }


  // ==========================================
  // DELETE
  // ==========================================

  async eliminar(id: number): Promise<void> {

    try {

      this.error = '';
      this.mensaje = '';

      await this.productosService.eliminarProducto(id);

      this.mensaje =
        'Producto eliminado correctamente.';

      await this.cargarProductos();

    } catch (error: any) {

      this.error = error.message;

    }
  }


  // ==========================================
  // LIMPIAR
  // ==========================================

  limpiarFormulario(): void {

    this.editandoId = null;

    this.nombre = '';

    this.descripcion = '';

    this.precio = null;
  }
}
