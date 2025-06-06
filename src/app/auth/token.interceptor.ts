import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
// Este interceptor agrega el token JWT a las solicitudes HTTP
// Si hay un token en localStorage, lo agrega al encabezado Authorization
// Si no hay token, simplemente pasa la solicitud sin modificarla
// Asegúrate de registrar este interceptor en tu módulo principal (app.module.ts)
// ```typescript
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from './auth/token.interceptor';
// 
// @NgModule({
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: TokenInterceptor,
//       multi: true,
//     },
//   ],
// })
// })
// export class AppModule {}
// ```
// Esto asegura que todas las solicitudes HTTP pasen por el interceptor y tengan el token agregado si está presente
// Puedes extender este interceptor para manejar errores de autenticación, como redirigir al usuario a la página de login si el token es inválido o ha expirado
// También puedes agregar lógica para refrescar el token si es necesario
// Asegúrate de probar el interceptor para verificar que el token se agrega correctamente a las solicitudes y que las rutas protegidas funcionan como se espera
// ```typescript
// const routes: Routes = [