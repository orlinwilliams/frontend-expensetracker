import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  minLengthPassword: number = 4;
  rePassword = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  formRegister = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.rePassword),
      Validators.minLength(8),
      Validators.maxLength(50)
    ]),
    password: new FormControl('', [
      Validators.required,      
      Validators.minLength(this.minLengthPassword),
    ]),
  });
  constructor() {}

  ngOnInit(): void {}
  register(){
    console.log(this.formRegister.value);
  }
}
