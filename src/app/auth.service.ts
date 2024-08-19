import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

interface LoginResponse {
  id: number;
  userName: string;
  userPassword: string;
}

@Injectable({
  providedIn:'root'
})
export class AuthService {
  private loginUrl = 'http://185.209.230.19:8081/user/login';
  constructor(private http: HttpClient){ 

  }

  login(userName: string, userPassword: string): Observable<LoginResponse> {
    const body = { userName, userPassword };
    console.log("datos", body);
    return this.http.post<LoginResponse>(this.loginUrl, body).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error:HttpErrorResponse){
  let errorMessage= 'Ocurrio un error';
  if(error.error instanceof ErrorEvent){
    errorMessage = `Client-side error: ${error.error.message}`;
  }else {
    errorMessage= `Server error: ${error.status}\nMessage: ${error.message}`;
  }
  console.error(errorMessage);
  return throwError(()=> new Error(errorMessage));
  } 

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem('token');
  }
}
