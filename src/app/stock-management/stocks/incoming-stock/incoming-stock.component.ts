// import { Component } from '@angular/core';
// import { IncomingStockService } from './incoming-stock.service';

// @Component({
//   selector: 'app-incoming-stock',
//   templateUrl: './incoming-stock.component.html',
//   styleUrls: ['./incoming-stock.component.css']
// })
// export class IncomingStockComponent {

//   item = {
//     itemId: null,
//     itemName: '',
//     itemDescription: '',
//     itemCategory: '',
//     order_date: '',
//     quantity: null,
//     status: ''
//   };

//   constructor(private incomingStockService: IncomingStockService) { }

//   addIncomingStock() {
//     this.incomingStockService.addIncomingStock(this.item).subscribe(
//       (response) => {
//         alert('Incoming stock added successfully!');
//         console.log('Incoming stock added successfully!', response);
//         // Reset the form
//         this.item.itemId = null;
//         this.item.itemName = '';
//         this.item.itemDescription = '';
//         this.item.itemCategory = '';
//         this.item.order_date = '';
//         this.item.quantity = null;
//         this.item.status = '';
//         // this.item.modified_date = null;

//       },
//       (error) => {
//         console.error('Error adding incoming stock:', error);
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { IncomingStockService } from './incoming-stock.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-incoming-stock',
  templateUrl: './incoming-stock.component.html',
  styleUrls: ['./incoming-stock.component.css']
})
export class IncomingStockComponent {
  item: FormGroup; 
  errorMessage: string = '';  isDateInvalid: boolean = false;


  constructor(private incomingStockService: IncomingStockService, private fb: FormBuilder) { 
    this.item = this.fb.group({ // Initialize the form with FormBuilder
      itemId: [null, [Validators.required, Validators.pattern(/^\d+$/)]], // Only numbers allowed
      itemName: ['', [Validators.required, this.noNumbersValidator]],
      itemDescription: ['', [Validators.required, this.noNumbersValidator]],
      itemCategory: ['', [Validators.required, this.noNumbersValidator]],
      order_date: ['', [Validators.required, this.futureDateValidator]], 
      quantity: [null, [Validators.required, Validators.min(1)]], // Set minimum value for quantity
      status: ['']
    });
  }
  noNumbersValidator(control: { value: string; }) {
    if (/\d/.test(control.value)) {
      return { containsNumber: true };
    }
    return null;
  }

  futureDateValidator(control: { value: string | number | Date; }) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { invalidDate: true };
    }
    return null;
  }
  checkOrderDateValidity() {
    const orderDateControl = this.item.get('order_date');
    if (orderDateControl) {
      const selectedDate: Date = new Date(orderDateControl.value);
      const currentDate: Date = new Date();
      this.isDateInvalid = selectedDate < currentDate;
    }
  }
  
  onSubmit() {
    // Handle form submission here
    console.log(this.item.value); // Log the form value for testing
    this.addIncomingStock(); // Call method to add incoming stock
  }

  onCancelClick() {
    // Handle cancel button click here
    this.item.reset(); // Reset the form
  }

  addIncomingStock() {
    if (!this.item.valid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }
    this.incomingStockService.addIncomingStock(this.item.value).subscribe(
      (response) => {
        alert('Incoming stock added successfully!');
        console.log('Incoming stock added successfully!', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding incoming stock:', error);
      }
    );
  }

  resetForm() {
    this.item.reset(); // Reset the form
    this.errorMessage = ''; // Clear error message
  }
}
