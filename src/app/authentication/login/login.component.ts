import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/authentication/current-user.service';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorPasswordOrEmail: boolean = false;
  rePassword = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  minLengthPassword: number = 4;
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.rePassword),
      Validators.minLength(8),
      Validators.maxLength(40),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLengthPassword),
    ]),
  });
  constructor(
    private loginService: LoginService,
    private currentUserService: CurrentUserService,
    private router:Router
  ) {}

  ngOnInit(): void {}
  login() {
    this.loginService.login(this.formLogin.value).subscribe(
      (res: any) => {        
        this.currentUserService.saveUser(res);
        this.router.navigateByUrl('/dashboard');
      },
      (error) => console.log(error)
    );
  }
}
