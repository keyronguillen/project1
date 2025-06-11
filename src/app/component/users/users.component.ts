import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Opcional si usas íconos


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, 
    FormsModule, 
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  nuevoUsuario: Partial<User> & { contrasena?: string } = this.usuarioVacio();
  usuarioEditando: Partial<User> & { contrasena?: string } | null = null;
  mostrarFormulario = false;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.obtenerUsuarios();
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
      next: (data) => (this.users = data),
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
    this.usuarioEditando = { ...user };
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
