import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './services/authentication';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authenticationService: AuthenticationService
  ) { }

  showHeader(): boolean {
    return this.router.url !== '/login' &&
           this.router.url !== '/register';
  }

  async confirmLogout(): Promise<void> {

    const alert = await this.alertController.create({
      header: ' Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.authenticationService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}