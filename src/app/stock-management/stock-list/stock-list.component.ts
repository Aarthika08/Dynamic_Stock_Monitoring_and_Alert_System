


// // stock-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { StocksService } from '../stock-list/stock-list.service';
// import { catchError, retry } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { MatDialog } from '@angular/material/dialog';
// // import { StockItem } from '../stock-list/stock-item.model'; // Assuming StockItem represents the correct type

// import {EditStockComponent} from './edit-stock-folder/edit-stock.component';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// interface StockItem {
//   name: string;
//   quantity: number;
//   price: number;
//   // Add any other properties your stock item might have
//   deleted?: boolean; // Optional property for soft deletion
// }

// @Component({
//   selector: 'app-stock-list',
//   templateUrl: './stock-list.component.html',
//   styleUrls: ['./stock-list.component.css']
// })
// export class StockListComponent implements OnInit {
//   stocks: StockItem[] = [];
//   // stocks: any[] = [];
//   errorMessage: string = '';
//   editingUserIndex: number = -1;
//   updatedData: any = {};
//   items: any[] = [];
//   selectedItem: any;

//   users: any[] = []; // Assuming this is where your user data will be stored
//   stockData: any;
//   orderslist: any[] = [];

//   constructor(private stocksService: StocksService,private dialog: MatDialog) { }

//   ngOnInit(): void {
//     this.getStock();
//     // this.fetchStock();
//     this.fetchUsers();

    
//   }

//   getStock(): void {
//     this.stocksService.getStockList()
//       .subscribe(
//         data => {
//           this.stocks = data.stock; 
//         },
//         error => {
//           console.error('Error fetching stock data:', error);
//           this.errorMessage = 'Error fetching stock data';
//         }
//       );
//   }

  

     
//   cancelEdit(): void {
//     this.editingUserIndex = -1;
//     this.updatedData = {};
//   }

 
//   editUser(index: number): void {
//     const dialogRef = this.dialog.open(EditStockComponent, {
//       width: '600px',
//       data: this.stocks[index] // Pass user data to the dialog
//     });

//     dialogRef.afterClosed().subscribe(updatedUserData => {
//       if (updatedUserData) {
//         this.updateUser(index, updatedUserData);
//       }
//     });
//   }

//   updateUser(index: number, updatedData: any): void {
//     this.stocksService.updateStock(index, updatedData).subscribe(
//       response => {
//         console.log('Stocks  updated successfully:', response);
//         // Handle any action after successful update if needed
//       },
//       error => {
//         console.error('Error updating stock:', error);
//         // Handle error if needed
//       }
//     );
//   }

  
//   fetchUsers(): void {
//     this.stocksService.getStockList().subscribe(
//       (data: any) => {
//         if (data && data.stock) {
//           this.stockData = data.stock.filter((item: any) => !item.delete);
//         } else {
//           this.errorMessage = 'No stock data available.';
//         }
//       },
//       error => {
//         console.error('Error fetching stock data:', error);
//         this.errorMessage = 'Failed to fetch stock data.';
//       }
//     );
//   }

//   softDeleteItem(itemId: number): void {
//     this.stocksService.softDeleteStockItem(itemId).subscribe(
//       () => {
//         this.fetchUsers(); // Refresh data after soft deletion
//       },
//       error => {
//         console.error('Error soft deleting stock item:', error);
//         this.errorMessage = 'Failed to delete stock item.';
//       }
//     );
//   }


  
     


// }







// stock-list.component.ts

import { StocksService } from '../stock-list/stock-list.service';
import { MatDialog } from '@angular/material/dialog';
import {EditStockComponent} from './edit-stock-folder/edit-stock.component';

import { GraphDialogComponent } from './graph-dialog/graph-dialog.component';

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartType, ChartOptions } from 'chart.js';


interface StockItem {
  itemId: string;
  itemName: string;
  order_date: string;
  history: { date: string; quantity: number }[];
  outgoingHistory: { date: string; quantity: number }[];
}

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  
  editingUserIndex: number = -1;
  updatedData: any = {};
  selectedItem: any;

  users: any[] = []; // Assuming this is where your user data will be stored
  stockData: any;
  orderslist: any[] = [];
  items: any[] = []; // Assuming this is where your item data will be stored
  errorMessage: string = '';

 
  stocks: StockItem[] = [];
  databaseData: any;


  constructor(private stocksService: StocksService,private dialog: MatDialog,private http: HttpClient) { }

  ngOnInit(): void {
    this.getStock();
    this.fetchUsers();
    this.fetchData(); // Fetch data when the component initializes

  }

  
  fetchData(): void {
    const url = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d'; // Replace with your actual database URL
    this.http.get(url,{
      headers: {'Authorization': 'Basic ' + btoa('admin:admin')}
    }).subscribe((data: any) => {
      this.databaseData = data; // Assign fetched data to databaseData
    });
  }

openGraphDialog(itemId: number): void {
    if (!itemId) {
      console.error('ItemId is not set.');
      return;
    }

    this.stocksService.getStockList().subscribe(data => {
      if (Array.isArray(data)) {
        const item = data.find(item => item.itemId === itemId);
        if (item) {
          const dialogRef = this.dialog.open(GraphDialogComponent, {
            width: '1600px',height:'500px',
            data: item // Pass fetched item data to the dialog
          });
        } else {
          console.error('Item not found');
        }
      } else if (data && data.stock) { // Check if 'stock' property exists in data
        const item = data.stock.find((item:any) => item.itemId === itemId);
        if (item) {
          const dialogRef = this.dialog.open(GraphDialogComponent, {
            width: '600px',
            data: item // Pass fetched item data to the dialog
          });
        } else {
          console.error('Item not found');
        }
      } else {
        console.error('Data is not in the expected format');
      }
    });
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

  updateUser(index: number, updatedData: any): void {
    this.stocksService.updateStock(index, updatedData).subscribe(
      response => {
        console.log('Stocks  updated successfully:', response);
      },
      error => {
        console.error('Error updating stock:', error);
      }
    );
  }

  
  fetchUsers(): void {
    this.stocksService.getStockList().subscribe(
      (data: any) => {
        if (data && data.stock) {
          this.stockData = data.stock.filter((item: any) => !item.delete);
        } else {
          this.errorMessage = 'No stock data available.';
        }
      },
      error => {
        console.error('Error fetching stock data:', error);
        this.errorMessage = 'Failed to fetch stock data.';
      }
    );
  }

  softDeleteItem(itemId: number): void {
    this.stocksService.softDeleteStockItem(itemId).subscribe(
      () => {
        this.fetchUsers(); // Refresh data after soft deletion
      },
      error => {
        console.error('Error soft deleting stock item:', error);
        this.errorMessage = 'Failed to delete stock item.';
      }
    );
  }

}