

// // stock-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { StocksService } from '../stock-list/stock-list.service';

// @Component({
//   selector: 'app-stock-list',
//   templateUrl: './stock-list.component.html',
//   styleUrls: ['./stock-list.component.css']
// })
// export class StockListComponent implements OnInit {

//   stock: any = null;
//   errorMessage: string = '';

//   // constructor(private stocksService: StocksService) { }

//   stockData: any;

//   constructor(private stocksService: StocksService) { }

//   ngOnInit(): void {
//     this.getStockAvailability();
//   }

//   getStockAvailability(): void {
//     this.stocksService.getStockAvailability()
//       .subscribe(
//         data => {
//           this.stockData = data;
//         },
//         error => {
//           console.error('Error fetching stock data:', error);
//         }
//       );
//   }
 

// }


// stock-list.component.ts
import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stock-list/stock-list.service';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StockItem } from '../stock-list/stock-item.model'; // Assuming StockItem represents the correct type

import {EditStockComponent} from './edit-stock-folder/edit-stock.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: any[] = [];
  errorMessage: string = '';
  editingUserIndex: number = -1;
  updatedData: any = {};
  items: any[] = [];
  selectedItem: any;


  constructor(private stocksService: StocksService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStock();
    // this.fetchStock();
  }

  getStock(): void {
    this.stocksService.getStockList()
      .subscribe(
        data => {
          this.stocks = data.stock; 
        },
        error => {
          console.error('Error fetching stock data:', error);
          this.errorMessage = 'Error fetching stock data';
        }
      );
  }

  
  // editStock(index: number): void {
  //   const dialogRef = this.dialog.open(EditStockComponent, {
  //     width: '600px',
  //     data: this.stocks[index] // Pass stock data to the dialog
  //   });

  //   dialogRef.afterClosed().subscribe((updatedStock: StockItem) => {
  //     if (updatedStock) {
  //       this.updateStock(index, updatedStock);
  //     }
  //   });
  // }
     
  cancelEdit(): void {
    this.editingUserIndex = -1;
    this.updatedData = {};
  }

 
  editUser(index: number): void {
    const dialogRef = this.dialog.open(EditStockComponent, {
      width: '600px',
      data: this.stocks[index] // Pass user data to the dialog
    });

    dialogRef.afterClosed().subscribe(updatedUserData => {
      if (updatedUserData) {
        this.updateUser(index, updatedUserData);
      }
    });
  }

  updateUser(index: number, updatedUserData: any): void {
    this.stocksService.updateUser(index, updatedUserData).subscribe(
      response => {
        console.log('User updated successfully:', response);
        // Handle any action after successful update if needed
      },
      error => {
        console.error('Error updating user:', error);
        // Handle error if needed
      }
    );
  }

  }
