export interface UserRegister {
  nombre: string;
  apellidos: string;
  telefono: string;
  dni: string;
  correo: string;
  usuario: string;
  contrasena: string;
  genero: 'Masculino' | 'Femenino' | 'Otro';
}

export interface UserLogin {
  usuario: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
}
