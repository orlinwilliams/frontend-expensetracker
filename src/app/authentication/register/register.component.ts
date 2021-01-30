import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/authentication/register.service';
import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  minLengthPassword: number = 4;
  error: boolean = false;
  messageError: string = '';
  rePassword = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  formRegister = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.rePassword),
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLengthPassword),
    ]),
  });

  constructor(
    private registerService: RegisterService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  register() {
    this.registerService.register(this.formRegister.value).subscribe(
      (res: any) => {
        if (res.data) {
          this.toastService.dataToast = {
            showToast: true,
            classToast: 'success',
            message: 'successfully registered user',
          };
        }
      },
      (error) => {
        console.log(error);
        this.showError(error.error.message);
      }
    );
  }

  errorPassword() {
    if (
      this.formRegister.get('password')?.value.length < this.minLengthPassword
    )
      this.showError('Password requires at least 4 characters');
    else this.error = false;
  }

  showError(message: string) {
    this.error = true;
    this.messageError = message;
    this.closeError(3000);
  }

  closeError(duration: number) {
    setTimeout(() => {
      this.error = false;
      this.messageError = '';
    }, duration);
  }
}
