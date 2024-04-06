// stock.component.ts

import { Component, OnInit } from '@angular/core';
import { StockService } from './stockservice';

import {  FormGroup } from '@angular/forms';

import {
  AngularGridInstance,
  Formatter,Filters
} from 'node_modules/angular-slickgrid';

// const updateFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  
//   return `<button id="myButton"  style="background: rgb(74, 74, 168);color:white;border-radius:5px; height:31px; width:73px
//   " >Update</button>`;
// };
const viewFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  
  return `<button id="myButton"  style="background: rgb(74, 74, 168);color:white;border-radius:5px; height:31px; width:73px
  ">View</button>`;
};
// const mapFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  
//   return `<button id="myButton" style="background: rgb(74, 74, 168);color:white; border-radius:5px; height:31px; width:53px" >Add</button>`;
// };

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  // stockList!: any[];
  stockList: any[] = [];
  loading: boolean = true;
  error: any;
  columnDefinitions: any[] = [];
  gridOptions: any = {};
  dataset: any[] = [];
  assetForm!: FormGroup;
  page1Data: any[] = [];
  page2Form!: FormGroup; 
  
  angularGrid!: AngularGridInstance;

  searchQuery: any ;
  searchQueryLower:any;
  selectedFilterType: string = 'itemName';
  filteredDataset: any[] = [];
  fieldValueString:any;
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.fetchStockData();
  

}

   fetchStockData(): void {
      this.stockService.getStockList().subscribe(data => {
        this.stockList = data.stocklist;
        console.log(this.stockList);  
        this.page1Data = data.stocklist || [];
        console.log("page",this.stockList)
        this.dataTable()


      },
      (error) => {
        console.error('Error fetching assets:', error);
      }
    );
  }
  
  // applyFilter() {
  //   if (this.selectedFilterType && this.searchQuery) {
  //     this.filteredDataset = this.stockList.filter(data => {
  //       const fieldValue = data[0][this.selectedFilterType];
  //      console.log(fieldValue);
        
      
  //         console.log("value",data[0][this.selectedFilterType])

        
  //           this.fieldValueString = data[0][this.selectedFilterType].toString().toLowerCase();

  //           this.searchQueryLower = this.searchQuery.toLowerCase();

  //         return this.fieldValueString==this.searchQueryLower;
        
  //     });
  //   } 
  //   this.stockList=this.filteredDataset
  //   this.dataTable()
  //   console.log("aa",this.filteredDataset)
  // }

  applyFilter() {
    console.log("Filtering...");
    
    if (!this.selectedFilterType || !this.searchQuery) {
      console.log("No filter criteria provided. Resetting to display all data.");
      this.filteredDataset = this.stockList;
      this.dataTable(); // Update the dataset for the grid
      return; // Exit the function early
    }
  
    const searchTerm = this.searchQuery.toLowerCase();
  
    this.filteredDataset = this.stockList.filter(item => {
      const fieldValue = item[this.selectedFilterType]?.toString().toLowerCase();
      return fieldValue && fieldValue.includes(searchTerm);
    });
  
    console.log("Filtered dataset:", this.filteredDataset);
    this.dataTable(); // Update the dataset for the grid
  }
  


  dataTable(){
    this.columnDefinitions = [
        { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 50,  filterable: true, filter: { model: Filters.compoundInputNumber }},
        { id: 'itemName', name: 'Name', field: 'itemName', sortable: true, maxWidth: 200 ,filterable: true, filter: { model: Filters.compoundInputText } },
        { id: 'itemDescription', name: 'Description', field: 'itemDescription', sortable: true, maxWidth: 500, filterable: true, filter: { model: Filters.compoundInputText } }, 
        { id: 'itemCategory', name: 'Category', field: 'itemCategory', sortable: true,maxWidth: 200,filterable: true, filter: { model: Filters.compoundInputText }},
            
    ];
    


this.dataset = this.stockList.map((registration, index) => ({
  
        id: index + 1,
        itemName: registration? registration.itemName:"",
        itemDescription:  registration? registration.itemDescription:"",
        itemCategory: registration?registration.itemCategory:"",

      }));


   
    this.gridOptions = {
      enableAutoResize: true,
      enableCellNavigation: true,
      enableSorting: true,     
      enableFiltering: true,
      autoHeight: true,
      explicitInitialization: true, 
      showHeaderRow: true,
      headerRowHeight: 40, 
      rowHeight: 40, 
      enableAsyncPostRender: true,
      enableVirtualRendering: true ,
      autoResize: {
        maxWidth: 950,
        maxHeight:600
      },
    
  } 
  }

 
  }


  