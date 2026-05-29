import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {

  name: string = '';
  surname: string = '';
  age: number = 0;
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  register(): void {
    const registrationData = {
      name: this.name,
      surname: this.surname,
      age: this.age,
      email: this.email,
      password: this.password
    };

    this.authenticationService.register(registrationData).subscribe({
      next: () => {
  this.message = 'Account created successfully';
},
error: () => {
  this.message = 'Registration failed. Please check your details.';
}
    });
  }
}