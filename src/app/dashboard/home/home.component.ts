import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  formExpense = new FormGroup({
    value: new FormControl('', [Validators.required]),
    category: new FormControl('selectCategory', [Validators.required]),
  });
  formIncome = new FormGroup({
    value: new FormControl('', [Validators.required]),
    category: new FormControl('selectCategory', [Validators.required]),
  });
  validatedSelectCategory: boolean = true;
  optionModal: string = '';
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {}

  resetForm() {
    this.formExpense.setValue({ value: '', category: 'selectCategory' });
  }
  openModal(modal: any, event: any): void {
    this.modalService.open(modal, { centered: true });
    if (event.target.outerText === 'Income') {
      this.optionModal = 'Income';
    } else if (event.target.outerText === 'Expense') {
      this.optionModal = 'Expense';
    }
  }
  validatorSelectCategory() {
    if (this.formExpense.get('category')?.value != 'selectCategory')
      this.validatedSelectCategory = false;
    else this.validatedSelectCategory = true;
  }
  saveExpense() {
    console.log(this.formExpense.value);
  }
  saveIncome() {
    console.log(this.formIncome.value);
  }
}
