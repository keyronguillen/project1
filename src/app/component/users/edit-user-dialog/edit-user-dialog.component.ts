import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../../../services/user.service';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
  ],
})
export class EditUserDialogComponent {
  editedUser: Partial<User>;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.editedUser = { ...data }; // copia segura
  }

  guardarCambios() {
    if (this.editedUser.id) {
      this.userService.updateUser(this.editedUser.id.toString(), this.editedUser).subscribe({
        next: () => {
          this.toastr.success('Usuario actualizado correctamente');
          this.dialogRef.close(true); // indicar éxito
        },
        error: () => {
          this.toastr.error('Error al actualizar el usuario');
        },
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
