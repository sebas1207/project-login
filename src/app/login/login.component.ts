import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null=null;

  constructor(private authService : AuthService, private router: Router){}

  login(){
    this.authService.login(this.username, this.password).subscribe({
      next:(response) =>{
        console.log('Login succesful', response);
         alert("funciono amigo descansa");
      },
      error: (error)=>{
        this.errorMessage=error.message;
      }
    });
  }
}
