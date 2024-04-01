// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { OutgoingStockService } from './outgoing-stock.service';

// @Component({
//   selector: 'app-outgoing-stock',
//   templateUrl: './outgoing-stock.component.html',
//   styleUrls: ['./outgoing-stock.component.css']
// })
// export class OutgoingStockComponent {
//   stocks!: any[];
// newQuantity: any;
// userDetails: any = {
//   itemId: null,
//   quantity: null,
//   order_date: null
// };errorMessage: any;

//   constructor(private stocksService: OutgoingStockService) { }


//   addOutgoingStock() {
//     if (!this.userDetails.itemId || !this.userDetails.quantity || !this.userDetails.order_date) {
//       this.errorMessage = 'Please fill in all the fields.';
//       return;
//     }

//     this.stocksService.addOutgoingStock(this.userDetails).subscribe(
//       response => {
//         console.log('Outgoing stock added successfully:', response);
//         // Reset userDetails object for next entry
//         this.userDetails = {
//           itemId: null,
//           quantity: null,
//           order_date: null
//         };
//         this.errorMessage = null;
//       },
//       error => {
//         console.error('Failed to add outgoing stock:', error);
//         this.errorMessage = error; // Display error message
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OutgoingStockService } from './outgoing-stock.service';

@Component({
  selector: 'app-outgoing-stock',
  templateUrl: './outgoing-stock.component.html',
  styleUrls: ['./outgoing-stock.component.css']
})
export class OutgoingStockComponent implements OnInit {
  
  errorMessage!: any;
outgoingStockForm!: FormGroup<any>;

isDateInvalid: boolean = false;

  
    constructor(private formBuilder: FormBuilder, private outgoingStockService: OutgoingStockService) { }
  
    ngOnInit(): void {
      // Initialize the form with form controls and validators
      this.outgoingStockForm = this.formBuilder.group({
        itemId: [null, Validators.required],
        itemName: [null, Validators.required],
        quantity: [0, [Validators.required, Validators.min(1)]],
        order_date: [null, Validators.required]
      });
    }
    checkOrderDateValidity() {
      const outgoing_dateControl = this.outgoingStockForm.get('outgoing_date');
      if (outgoing_dateControl) {
        const selectedDate: Date = new Date(outgoing_dateControl.value);
        const currentDate: Date = new Date();
        currentDate.setHours(0, 0, 0, 0);

        this.isDateInvalid = selectedDate < currentDate;
      }
    }
    onSubmit() {
      if (this.outgoingStockForm.invalid) {
        this.errorMessage = 'Please fill in all the fields.';
        return;
      }
  
      // Extract form values
      const formData = this.outgoingStockForm.value;
  
      // Call service method to add outgoing stock
      this.outgoingStockService.addOutgoingStock(formData).subscribe(
        response => {
          console.log('stock dispatch  successfully:', response);
          alert('stock dispatch successfully');
          this.outgoingStockForm.reset(); // Reset the form after successful submission
          this.errorMessage = null;
        },
        error => {
          console.error('Failed to add outgoing stock:', error);
          alert('Failed to stock patch');
          this.errorMessage = error; // Display error message
        }
      );
    }
  }