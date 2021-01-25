import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor() {}
  saveUser(user: any) {
    localStorage.setItem('data', JSON.stringify(user));
  }
  getUser() {
    if (localStorage.getItem('data') == null) return { error: 'Not user' };

    const user = JSON.parse(localStorage.getItem('data') || '');
    return user;
  }
  getUserId() {
    if (localStorage.getItem('data') == null) return 'No exist Id';

    const user = JSON.parse(localStorage.getItem('data') || '');
    return user._id;
  }
  getUserEmail() {
    if (localStorage.getItem('data') == null) return 'Not user';

    const user = JSON.parse(localStorage.getItem('data') || '');
    return user.email;
  }
}
