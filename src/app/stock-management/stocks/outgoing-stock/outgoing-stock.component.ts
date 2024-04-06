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
        currentDate.setHours(0, 0, 0, 0);

        this.isDateInvalid = selectedDate < currentDate;
      }
    }
    checkStock() {
      const itemId = this.outgoingStockForm.get('itemId')?.value;
  
      if (!itemId) {
        // Item ID is not provided, return early
        return;
      }
  
      // Call the service method to get stock details
      this.outgoingStockService.getStockDetails(itemId).subscribe(
        (response: any) => {
          const quantity = response.quantity;
          const status = response.status;
  
          // Check if quantity is sufficient and status is valid
          if (quantity >= this.outgoingStockForm.get('quantity')?.value && status === 'active') {
            this.insufficientStockError = false;
          } else {
            this.insufficientStockError = true;
          }
        },
        (error) => {
          console.error('Failed to fetch stock details:', error);
          this.insufficientStockError = true;
        }
      );
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
  
      this.outgoingStockService.addOutgoingStock(formData).subscribe(
        response => {
          console.log('stock dispatch  successfully:', response);
          alert('stock dispatch successfully');
          this.outgoingStockForm.reset(); // Reset the form after successful submission
          this.errorMessage = null;
          this.insufficientStockError = false;

        },
        error => {
          console.error('Failed to add  stock dispatch:', error);
          alert('Failed to stock patch');
          this.insufficientStockError = true;
          this.errorMessage = error; // Display error message
        }
      
      );
      
    }
    
    
  }