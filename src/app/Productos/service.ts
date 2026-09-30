import { Injectable } from '@angular/core';
import { supabase } from '../supabase';



export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  activo: boolean;
  created_at: string;
}

@Injectable({providedIn: 'root'})
export class ProductosService {

  // ==========================================
  // READ
  // ==========================================

  async obtenerProductos(): Promise<Producto[]> {

    const { data, error } = await supabase
      .from('productos_prueba')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    return data ?? [];
  }


  // ==========================================
  // CREATE
  // ==========================================

  async crearProducto(nombre: string,descripcion: string,precio: number): Promise<Producto> 
  {
    const { data, error } = await supabase
      .from('productos_prueba')
      .insert({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }


  // ==========================================
  // UPDATE
  // ==========================================

  async actualizarProducto(id: number,nombre: string,descripcion: string,precio: number): Promise<Producto> {

    const { data, error } = await supabase
      .from('productos_prueba')
      .update({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }


  // ==========================================
  // DELETE
  // ==========================================

  async eliminarProducto(id: number): Promise<void> {

    const { error } = await supabase
      .from('productos_prueba')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
}