import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnChanges {
  @Input() dataToast: any;
  showToast: boolean = false;
  message: string = '';
  classToast: string = '';
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    const { showToast, classToast, message } = this.dataToast;
    this.showToast = showToast;
    this.message = message;
    this.classToast = classToast;
  }
}
