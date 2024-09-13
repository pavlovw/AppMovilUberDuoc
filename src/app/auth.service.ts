import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  isAuthenticated(): boolean {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return loggedIn;
  }
  

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string): boolean {
    console.log('Attempting login with:', username, password);
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((user: any) => user.username === username && user.password === password);

    if (user) {
      this.loggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('Login successful');
      return true;
    }

    console.log('Login failed');
    return false;
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }
  

  getCurrentUser(): any {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Usuario actual desde el localStorage:', user);
    return user;
  }

  updateProfileImage(imageUrl: string) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.profileImage = imageUrl;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }

  getAllUsers(): any[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  deleteUser(username: string): void {
    const users = this.getAllUsers();
    const updatedUsers = users.filter((user: any) => user.username !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  updateUser(updatedUser: any) {
    const users = this.getAllUsers();
    const currentUser = this.getCurrentUser();
  
    const userIndex = users.findIndex((user: any) => user.username === currentUser.username);
    
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } else {
      console.error('Usuario no encontrado');
    }
  }

  register(firstName: string, lastName: string, username: string, password: string, birthdate: string): boolean {
    const storedUsers = this.getAllUsers();
    const existingUser = storedUsers.find((user: any) => user.username === username);
    
    if (existingUser) {
      console.log('El nombre ya existe');
      return false;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      username: username,
      password: password,
      birthdate: birthdate 
    };

    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    console.log('Usuario registrado');
    return true;
  }
}
