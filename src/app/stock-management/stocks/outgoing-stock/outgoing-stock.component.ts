


import { Component } from '@angular/core';
import { OutgoingStockService } from './outgoing-stock.service';

@Component({
  selector: 'app-outgoing-stock',
  templateUrl: './outgoing-stock.component.html',
  styleUrls: ['./outgoing-stock.component.css']
})
export class OutgoingStockComponent {

  item: any = {
    itemId: '',
    itemName: '',
    // itemDescription: '',
    // itemCategory: '',
    outgoing_date: '',
    quantity: 0,
    // status: ''
  };
 
  errorMessage: string = '';
  isSubmitDisabled: boolean = true; // Initially disable the submit button

  constructor(private outgoingStockService: OutgoingStockService) { }

  // Function to check if all fields are filled
  // checkFieldsFilled(): boolean {
  //   return this.item.itemId && this.item.itemName && this.item.itemDescription && 
  //          this.item.itemCategory && this.item.outgoing_date && this.item.quantity > 0;
  // }
  checkFieldsFilled(): boolean {
    return this.item.itemId && this.item.itemName  && this.item.outgoing_date && this.item.quantity > 0;
  }
  removeOutgoingStock(): void {
    if (!this.checkFieldsFilled()) {
      this.errorMessage = 'Please fill all fields.';
      return;
    }

    if (this.item.quantity <= 0) {
      this.errorMessage = 'No negative values are accepted ,stock dispatch ed should be greater than zero!';
      return;
    }

    this.outgoingStockService.removeOutgoingStock(this.item).subscribe(
      (response) => {
        console.log('stock dispatch done successfully:', response);
        alert("Dispatch Successful!");
        window.location.reload();
        
        // You can handle success response here
      },
      (error) => {
        console.error('Error!!! stock dispatch:', error);
        this.errorMessage = error; // Set error message
        // You can handle error response here
      }
    );
  }
}
