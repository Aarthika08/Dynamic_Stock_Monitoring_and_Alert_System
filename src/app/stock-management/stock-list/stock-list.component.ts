

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
// import { StockItem } from '../stock-list/stock-item.model'; // Assuming StockItem represents the correct type

import {EditStockComponent} from './edit-stock-folder/edit-stock.component';
interface StockItem {
  name: string;
  quantity: number;
  price: number;
  // Add any other properties your stock item might have
  deleted?: boolean; // Optional property for soft deletion
}
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: StockItem[] = [];
  // stocks: any[] = [];
  errorMessage: string = '';
  editingUserIndex: number = -1;
  updatedData: any = {};
  items: any[] = [];
  selectedItem: any;

  users: any[] = []; // Assuming this is where your user data will be stored
  stockData: any;

  constructor(private stocksService: StocksService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStock();
    // this.fetchStock();
    this.fetchUsers();
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

  updateUser(index: number, updatedData: any): void {
    this.stocksService.updateStock(index, updatedData).subscribe(
      response => {
        console.log('Stocks  updated successfully:', response);
        // Handle any action after successful update if needed
      },
      error => {
        console.error('Error updating stock:', error);
        // Handle error if needed
      }
    );
  }

  
  // fetchStock(): void {
  //   this.stocksService.getStockList().subscribe(
  //     (data: any) => {
  //       // Check if data is an object with numeric keys
  //       if (typeof data === 'object' && !Array.isArray(data)) {
  //         // Extract the stocks array from the data object
  //         const stocksArray = Object.values(data).filter(item => Array.isArray(item)) as any[]; // Type assertion
  //         // Merge all arrays into a single array
  //         this.stocks = ([] as any[]).concat(...stocksArray); // Type assertion
  //       } else {
  //         console.error('Data received is not in the expected format:', data);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching stocks:', error);
  //     }
  //   );
  // }

  // softDeleteStock(outerIndex: number): void {
  //   console.log('Deleting stock at index:', outerIndex);
  //   if (this.stocks[outerIndex]) {
  //     // Call service to update the database
  //     this.stocksService.deleteStock(this.stocks[outerIndex].id).subscribe(
  //       () => {
  //         console.log('Stock deleted successfully');
  //         // Remove the deleted stock from the local array
  //         this.stocks.splice(outerIndex, 1);
  //       },
  //       error => {
  //         console.error('Error deleting stock:', error);
  //       }
  //     );
  //   } else {
  //     console.log('Stock not found at index:', outerIndex);
  //   }
  // }
  
  // stock-list.component.ts

  // fetchUsers(): void {
  //   this.stocksService.getStockList().subscribe(
  //     (data: any) => {
  //       // Filter out deleted users
  //       this.stocks = data.stock.filter((item: StockItem) => !item.deleted);

  //     },
  //     (error) => {
  //       console.error('Error fetching users:', error);
  //     }
  //   );
  // }

  // fetchUsers(): void {
  //   this.stocksService.getStockList().subscribe(
  //     (data: any[]) => {
  //       // Filter out deleted users
  //       this.users = data.filter(user => !user.deleted);
  //     },
  //     error => {
  //       this.errorMessage = 'Failed to fetch users.';
  //     }
  //   );
  // }

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