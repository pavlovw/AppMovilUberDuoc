import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  firstName: string = '';  

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && this.authService.isAuthenticated()) {
      const fullNameParts = (currentUser.fullName || '').split(' ');
      this.firstName = fullNameParts[0] || 'Invitado'; 
    }
  }
}
