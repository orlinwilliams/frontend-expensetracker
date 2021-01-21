import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorPasswordOrEmail: boolean = false;

  minLengthPassword: number = 4;
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(this.minLengthPassword),
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLengthPassword),
    ]),
  });
  constructor() {}

  ngOnInit(): void {}
  login(){
    console.log(this.formLogin.value)
  }
}
