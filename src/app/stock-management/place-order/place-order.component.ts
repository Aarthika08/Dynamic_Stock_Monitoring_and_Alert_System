// import { Component } from '@angular/core';
// import { POService } from './po.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-place-order',
//   templateUrl: './place-order.component.html',
//   styleUrls: ['./place-order.component.css']
// })
// export class PlaceOrderComponent {
//   orderForm!: FormGroup; 
//   errorMessage: string = ''; 
//   isDateInvalid: boolean = false;

//   constructor(private poService: POService, private fb: FormBuilder) {
//     this.orderForm = this.fb.group({
//             order_id: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
//             customer_id: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
//             order_date: ['', [Validators.required, this.futureDateValidator]], 
//             order_status:  ['', [Validators.required, this.noNumbersValidator]],
//             price: [null, [Validators.required, Validators.min(0)]],
//             stock_name: ['', [Validators.required, this.noNumbersValidator]],
//             stock_quantity: [null, [Validators.required, Validators.min(0)]],
//             product_name: ['', [Validators.required, this.noNumbersValidator]],
//             single_quantity_price: [null, [Validators.required, Validators.min(0)]],
//             // total_price: [null, [Validators.required, Validators.min(0)]]
//             total_price: [{value: null, disabled: true}]
//           });
      
  
//   }
//   noNumbersValidator(control: { value: string; }) {
//     if (/\d/.test(control.value)) {
//       return { containsNumber: true };
//     }
//     return null;
//   }

//   futureDateValidator(control: { value: string | number | Date; }) {
//     const selectedDate = new Date(control.value);
//     const currentDate = new Date();
//     if (selectedDate < currentDate) {
//       return { invalidDate: true };
//     }
//     return null;
//   }




//   onSubmit() {
//     if (this.orderForm.valid) {
//       this.poService.addOrder(this.orderForm.value)
//         .subscribe(
//           response => {
//             console.log('Order added successfully:', response);
//             this.orderForm.reset();
//           },
//           error => {
//             console.error('Error adding order:', error);
//           }
//         );
//     }
//   }
// }



import { Component } from '@angular/core';
import { POService } from './po.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {
  orderForm!: FormGroup; 
  errorMessage: string = ''; 
  isDateInvalid: boolean = false;

  constructor(private poService: POService, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      order_id: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      customer_id: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      order_date: ['', [Validators.required, this.futureDateValidator]], 
      // order_status:  ['', [Validators.required, this.noNumbersValidator]],
      order_status: ['Pending', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      stock_name: ['', [Validators.required, this.noNumbersValidator]],
      stock_quantity: [null, [Validators.required, Validators.min(0)]],
      product_name: ['', [Validators.required, this.noNumbersValidator]],
      single_quantity_price: [null, [Validators.required, Validators.min(0)]],
      total_price: [{value: null, disabled: true}]
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
    const orderDateControl = this.orderForm.get('order_date');
    if (orderDateControl) {
      const selectedDate: Date = new Date(orderDateControl.value);
      const currentDate: Date = new Date();
      this.isDateInvalid = selectedDate < currentDate;
    }
  }

  calculateTotalPrice(): void {
    const singlePriceControl = this.orderForm.get('single_quantity_price');
    const quantityControl = this.orderForm.get('stock_quantity');
    const totalPriceControl = this.orderForm.get('total_price');
  
    if (singlePriceControl && quantityControl && totalPriceControl) {
      const singlePrice = singlePriceControl.value;
      const quantity = quantityControl.value;
  
      if (singlePrice !== null && quantity !== null) {
        const totalPrice = singlePrice * quantity;
        totalPriceControl.setValue(totalPrice);
      } else {
        totalPriceControl.setValue(null);
      }
    }
  }
  
  // updateOrderStatus(): void {
  //   const currentDate = new Date();
  //   const oneMinuteLater = new Date(currentDate);
  //   oneMinuteLater.setMilliseconds(currentDate.getMilliseconds() + 60000); // One minute in milliseconds
  //   const twoMinutesLater = new Date(oneMinuteLater);
  //   twoMinutesLater.setMilliseconds(oneMinuteLater.getMilliseconds() + 60000); // Two minutes in milliseconds
  //   const fiveMinutesLater = new Date(twoMinutesLater);
  //   fiveMinutesLater.setMilliseconds(twoMinutesLater.getMilliseconds() + 300000); // Five minutes in milliseconds

  //   setTimeout(() => {
  //     const currentStatus = this.orderForm.get('order_status')?.value;
  //     switch (currentStatus) {
  //       case 'Pending':
  //         this.orderForm.get('order_status')?.setValue('Packed');
  //         break;
  //       case 'Packed':
  //         this.orderForm.get('order_status')?.setValue('Processing');
  //         break;
  //       case 'Processing':
  //         this.orderForm.get('order_status')?.setValue('Shipped');
  //         break;
  //       case 'Shipped':
  //         this.orderForm.get('order_status')?.setValue('Delivered');
  //         break;
  //       default:
  //         // Do nothing
  //         break;
  //     }
      
  //     // Update the order status in the database
  //     this.poService.updateOrderStatus(this.orderForm.value).subscribe(
  //       response => {
  //         console.log('Order status updated successfully in the database:', response);
  //       },
  //       error => {
  //         console.error('Error updating order status in the database:', error);
  //       }
  //     );
  //   }, fiveMinutesLater.getTime() - currentDate.getTime()); // Difference in milliseconds
  // }

  onSubmit() {
    if (this.orderForm.valid) {
      this.poService.addOrder(this.orderForm.value)
        .subscribe(
          response => {
            console.log('Order added successfully:', response);
            this.orderForm.reset();
          },
          error => {
            console.error('Error adding order:', error);
          }
        );
    }
  }
  onCancelClick() {
    // Handle cancel button click here
    this.orderForm.reset(); // Reset the form
  }

}
