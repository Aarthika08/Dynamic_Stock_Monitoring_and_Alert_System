// edit-user-dialog.component.ts

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StocksService } from '../stock-list.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




  @Component({
    selector: 'app-edit-stock',
    templateUrl: './edit-stock.component.html',
    styleUrls: ['./edit-stock.component.css']
  })
  export class EditStockComponent {
  
  stockData: any;

  constructor(
    public dialogRef: MatDialogRef<EditStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.stockData = { ...data }; // Make a copy of the data to avoid modifying the original object
  }

  saveStock(): void {
    // Pass the updated user data back to the parent component
    this.dialogRef.close(this.stockData);
  }

  closeDialog(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}