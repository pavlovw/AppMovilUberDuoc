import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  users: any[] = [];  

  constructor(private authService: AuthService) {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.authService.getAllUsers();
  }

  deleteUser(username: string) {
    this.authService.deleteUser(username);
    this.loadUsers(); 
  }
}