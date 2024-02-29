


// import { Component } from '@angular/core';
// import { OutgoingStockService } from './outgoing-stock.service';

// @Component({
//   selector: 'app-outgoing-stock',
//   templateUrl: './outgoing-stock.component.html',
//   styleUrls: ['./outgoing-stock.component.css']
// })
// export class OutgoingStockComponent {

//   item: any = {
//     itemId: '',
//     itemName: '',
//     // itemDescription: '',
//     // itemCategory: '',
//     outgoing_date: '',
//     quantity: 0,
//     // status: ''
//   };
 
//   errorMessage: string = '';
//   isSubmitDisabled: boolean = true; // Initially disable the submit button

//   constructor(private outgoingStockService: OutgoingStockService) { }


//   checkFieldsFilled(): boolean {
//     return this.item.itemId && this.item.itemName  && this.item.outgoing_date && this.item.quantity > 0;
//   }
//   removeOutgoingStock(): void {
//     if (!this.checkFieldsFilled()) {
//       this.errorMessage = 'Please fill all fields.';
//       return;
//     }

//     if (this.item.quantity <= 0) {
//       this.errorMessage = 'No negative values are accepted ,stock dispatch ed should be greater than zero!';
//       return;
//     }

//     this.outgoingStockService.removeOutgoingStock(this.item).subscribe(
//       (response) => {
//         console.log('stock dispatch done successfully:', response);
//         alert("Dispatch Successful!");
//         window.location.reload();
        
//         // You can handle success response here
//       },
//       (error) => {
//         console.error('Error!!! stock dispatch:', error);
//         this.errorMessage = error; // Set error message
//         // You can handle error response here
//       }
//     );
//   }
// }
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import Validators
import { OutgoingStockService } from './outgoing-stock.service';

@Component({
  selector: 'app-outgoing-stock',
  templateUrl: './outgoing-stock.component.html',
  styleUrls: ['./outgoing-stock.component.css']
})
export class OutgoingStockComponent {
  item: FormGroup; // Define FormGroup
  isDateInvalid: boolean = false;

  errorMessage: string = '';
  isSubmitDisabled: boolean = true; // Initially disable the submit button

  constructor(private outgoingStockService: OutgoingStockService, private fb: FormBuilder) {
    this.item = this.fb.group({ // Initialize the form with FormBuilder
      itemId: ['', Validators.required],
      itemName: ['', Validators.required],
      outgoing_date: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]], // Set minimum value for quantity
    });
  }

  checkOrderDateValidity() {
    const outgoing_dateControl = this.item.get('outgoing_date');
    if (outgoing_dateControl) {
      const selectedDate: Date = new Date(outgoing_dateControl.value);
      const currentDate: Date = new Date();
      this.isDateInvalid = selectedDate < currentDate;
    }
  }
  
  removeOutgoingStock(): void {
  

    const quantityControl = this.item && this.item.get('quantity');
    if (quantityControl && quantityControl.value <= 0) {
      // Handle the case where quantity is not valid
      this.errorMessage = 'Quantity must be greater than 0.';
      return;
    }
    
      

    this.outgoingStockService.removeOutgoingStock(this.item.value).subscribe(
      (response) => {
        console.log('Stock dispatch done successfully:', response);
        alert("Dispatch Successful!");
        window.location.reload();
        // You can handle success response here
      },
      (error) => {
        console.error('Error!!! Stock dispatch:', error);
        this.errorMessage = error; // Set error message
        // You can handle error response here
      }
    );
  }
}
