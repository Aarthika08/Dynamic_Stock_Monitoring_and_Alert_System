// stock.component.ts

import { Component, OnInit } from '@angular/core';
import { StockService } from './stockservice';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockList!: any[];
  loading: boolean = true;
  error: any;
  columnDefinitions: any[] = [];
  gridOptions: any = {};
  dataset: any[] = [];
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.fetchStockData();
  

  this.gridOptions = {
    enableAutoResize: true,
    autoHeight: true, // Enable auto height to adjust grid size automatically
    enableCellNavigation: true,
    enableSorting: true,
    showHeaderRow: true,
    headerRowHeight: 30, // Adjust header row height as needed
    rowHeight: 40, // Adjust row height as needed
  };
}

  fetchStockData(): void {
    this.stockService.getStockList().subscribe(data => {
      this.stockList = data.stocklist;
      console.log(this.stockList);  

 
      this.columnDefinitions = [
        { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 50 },
        { id: 'itemName', name: 'Name', field: 'itemName', sortable: true, maxWidth: 700 },
        { id: 'itemDescription', name: 'Description', field: 'itemDescription', sortable: true, maxWidth: 700 },
        { id: 'itemCategory', name: 'Category', field: 'itemCategory', sortable: true,maxWidth: 700 },
        
      ];
      

      // Populate dataset dynamically
      this.dataset = this.stockList.map((registration, index) => ({
        id: index + 1,
        itemName: registration.itemName,
        itemDescription: registration.itemDescription,
        itemCategory:registration.itemCategory,
       
      }));

      // Set grid options
      this.gridOptions = {
        enableAutoResize: true,
        enableCellNavigation: true,
        enableSorting: true,
        autoHeight: true, // Disable autoHeight to enable vertical scrolling
        explicitInitialization: true, // Explicit initialization is needed when using autoHeight or virtual scrolling
        showHeaderRow: true, // Show header row if needed
        headerRowHeight: 10, // Adjust header row height as needed
        rowHeight: 40, // Adjust row height as needed
        enableAsyncPostRender: true, // Enable async post render if needed
        enableVirtualRendering: true ,
        gridwidth:10,
        autoResize: {
          maxWidth: 700,// container DOM selector
        },
        headerRowBackgroundColor: 'purple', // Set header row background color
        headerRowTextColor: 'orange' // Set header row text color
      };

    
    });

    }
  }
//     error => {
//       this.error = error.message || 'Unknown error occurred';
//       this.loading = false;
//     }
// });
// }


  