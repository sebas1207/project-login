import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/user/login';
  constructor(private http: HttpClient){ }

  login(username: string, password: string): Observable<boolean>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const body = JSON.stringify({username, password});
    return this.http.post<any>(this.loginUrl, body, {headers}).pipe(
      map(response =>{
        if(response && response.token){
          localStorage.setItem('token', response.token);
          return true;
        }else {
          return false;
        }
      }),
      catchError(error =>{
        console.error('Error de inicio de sesion', error);
        return throwError(()=> new Error('error de inicio de sesion'));

      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem('token');
  }
}
