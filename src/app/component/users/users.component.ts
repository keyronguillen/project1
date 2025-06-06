import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  newUser = {
    usuario: '',
    contrasena: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = { usuario: '', contrasena: '' };
    });
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
  }

  updateUser() {
    const { _id, ...rest } = this.selectedUser;
    this.userService.updateUser(_id, rest).subscribe(() => {
      this.getUsers();
      this.selectedUser = null;
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  cancelEdit() {
    this.selectedUser = null;
  }
}