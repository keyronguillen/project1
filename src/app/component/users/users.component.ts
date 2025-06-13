import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Opcional si usas íconos
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['usuario', 'nombreCompleto', 'correo', 'dni', 'genero', 'telefono', 'acciones'];

  users = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  nuevoUsuario: Partial<User> & { contrasena?: string } = this.usuarioVacio();
  usuarioEditando: Partial<User> & { contrasena?: string } | null = null;
  mostrarFormulario = false;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    console.log('UserComponent inicializado');
    this.obtenerUsuarios();
  }

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.users.filter = filtro.trim().toLowerCase();
  }


  usuarioVacio() {
    return {
      nombre: '',
      apellidos: '',
      telefono: '',
      dni: '',
      correo: '',
      usuario: '',
      genero: '',
      contrasena: '',
    };
  }

  obtenerUsuarios() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.data = data;
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
        console.log('Usuarios obtenidos:', data);
      },
      error: (err) => this.toastr.error('Error al obtener usuarios'),
    });
  }

  crearUsuario() {
    if (this.nuevoUsuario.usuario && this.nuevoUsuario.contrasena) {
      this.userService.createUser(this.nuevoUsuario).subscribe({
        next: () => {
          this.obtenerUsuarios();
          this.toastr.success('Usuario creado correctamente');
          this.nuevoUsuario = this.usuarioVacio();
          this.mostrarFormulario = false;
        },
        error: () => this.toastr.error('Error al crear usuario'),
      });
    }
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id.toString()).subscribe({
        next: () => {
          this.obtenerUsuarios();
          this.toastr.success('Usuario eliminado');
        },
        error: () => this.toastr.error('Error al eliminar usuario'),
      });
    }
  }

  editarUsuario(user: User) {
    this.usuarioEditando = { ...user, contrasena: '' };
  }

  guardarCambiosUsuario() {
    if (this.usuarioEditando?.id) {
      const { contrasena, ...resto } = this.usuarioEditando;
      this.userService.updateUser(this.usuarioEditando.id.toString(), resto).subscribe({
        next: () => {
          this.obtenerUsuarios();
          this.usuarioEditando = null;
          this.toastr.success('Usuario actualizado');
        },
        error: () => this.toastr.error('Error al actualizar usuario'),
      });
    }
  }

  cancelarEdicion() {
    this.usuarioEditando = null;
  }

  mostrarDetalles(user: User) {
    alert(`Detalles de ${user.usuario}:\nNombre completo: ${user.nombre} ${user.apellidos}`);
  }

  mostrarCambiarContrasena(user: User) {
    const nuevaPass = prompt(`Nueva contraseña para ${user.usuario}:`);
    if (nuevaPass) {
      this.userService.updateUser(user.id.toString(), { contrasena: nuevaPass }).subscribe({
        next: () => this.toastr.success('Contraseña actualizada'),
        error: () => this.toastr.error('Error al cambiar contraseña'),
      });
    }
  }
}
