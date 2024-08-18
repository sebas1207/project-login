import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  errorMessage: string ='';

  constructor(private authService : AuthService, private router: Router){}

  login(){
    this.authService.login(this.username, this.password).subscribe(success => {
      if(success){
        this.router.navigate(['/dashboard']);
      } else{
        this.errorMessage = 'Credenciales Erroneas';
      }
    });
  }
}
