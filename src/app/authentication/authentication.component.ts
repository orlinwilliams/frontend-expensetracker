import { Component, OnInit } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../services/shared/toast.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  faPiggyBank = faPiggyBank;
  constructor(public toastService:ToastService ) { }

  ngOnInit(): void {
    
  }

}
