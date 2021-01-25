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
  getUserId():string {
    if (localStorage.getItem('data') == null) return 'No exist Id';

    const user = JSON.parse(localStorage.getItem('data') || '');
    return user._id;
  }
  existToken():boolean{
    if (localStorage.getItem('data') == null) return false;
    return true;
  }
  getUserToken():string {
    if (localStorage.getItem('data') == null) return 'No exist token';

    const user = JSON.parse(localStorage.getItem('data') || '');
    return user.token;
  }
  getUserEmail() {
    if (localStorage.getItem('data') == null) return 'Not user';

    const user = JSON.parse(localStorage.getItem('data') || '');
    return user.email;
  }
}
