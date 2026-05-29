import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  userEmail: string = '';
  userPassword: string = '';
  message: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  login(): void {

    const loginData = {
      email: this.userEmail,
      password: this.userPassword
    };

    this.authenticationService.login(loginData).subscribe({

      next: (response) => {

        this.authenticationService.saveToken(response.token);

        this.router.navigate(['/search']);

      },

      error: () => {

        this.message = 'Invalid login details';

      }
    });
  }
}