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
insufficientStockError: boolean = false;

  
    constructor(private formBuilder: FormBuilder, private outgoingStockService: OutgoingStockService) { }
  
    ngOnInit(): void {
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
        selectedDate.setHours(0, 0, 0, 0);

        currentDate.setHours(0, 0, 0, 0);

        this.isDateInvalid = selectedDate < currentDate;
      }
    }
   
    checkStock() {
      const itemId = this.outgoingStockForm.get('itemId')?.value;
  
      if (!itemId) {
          return;
      }
  
      // Call the service method to get stock details
      this.outgoingStockService.getStockDetails(itemId).subscribe({
         next: (response: any) => {
              console.log('Stock details response:', response);
  
              // Assuming response is an array of stock items
              const stockItem = response.stock.find((item: any) => item.itemId === itemId);
  
              if (stockItem) {
                  const quantity = stockItem.quantity;
                  const status = stockItem.status;
  
                  const requestedQuantity = this.outgoingStockForm.get('quantity')?.value;
  
                  console.log('Requested Quantity:', requestedQuantity);
                  console.log('Available Quantity:', quantity);
                  console.log('Status:', status);
  
                  if (requestedQuantity <= quantity && status === 'instock') {
                      this.insufficientStockError = false; // Sufficient stock
                  } else {
                      this.insufficientStockError = true; // Insufficient stock or invalid status
                  }
              } else {
                  console.error('Stock item not found for itemId:', itemId);
                  this.insufficientStockError = true; // Handle case where stock item is not found
              }
          },
        error: (error) => {
              console.error('Failed to fetch stock details:', error);
              this.insufficientStockError = true; // Error occurred, show as insufficient stock
          }
    });
  }
  
    
    onSubmit() {
      if (this.outgoingStockForm.invalid) {
        this.errorMessage = 'Please fill in all the fields.';
        return;
      }
      const quantityControl = this.outgoingStockForm.get('quantity');
      if (quantityControl && quantityControl.value <= 0) {
        this.insufficientStockError = true;
        return;
      }
      const formData = this.outgoingStockForm.value;
  
      this.outgoingStockService.addOutgoingStock(formData).subscribe({
        next:response => {
          console.log('stock dispatch  successfully:', response);
          alert('stock dispatch successfully');
          this.outgoingStockForm.reset(); // Reset the form after successful submission
          this.errorMessage = null;
          this.insufficientStockError = false;

        },
        error:error => {
          console.error('Failed to add  stock dispatch:', error);
          alert('Failed to stock patch');
          this.insufficientStockError = true;
          this.errorMessage = error; // Display error message
        }
      
     });
      
    }
    
    
  }