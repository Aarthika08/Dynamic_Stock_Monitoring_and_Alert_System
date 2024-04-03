// stock.component.ts

import { Component, OnInit } from '@angular/core';
import { StockService } from './stockservice';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import {
  AngularGridInstance,
  Formatter,Filters
} from 'node_modules/angular-slickgrid';

const updateFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  
  return `<button id="myButton"  style="background: rgb(74, 74, 168);color:white;border-radius:5px; height:31px; width:73px
  " >Update</button>`;
};
const viewFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  
  return `<button id="myButton"  style="background: rgb(74, 74, 168);color:white;border-radius:5px; height:31px; width:73px
  ">View</button>`;
};
const mapFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  
  return `<button id="myButton" style="background: rgb(74, 74, 168);color:white; border-radius:5px; height:31px; width:53px" >Add</button>`;
};

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
  

  // this.gridOptions = {
  //   enableAutoResize: true,
  //   autoHeight: true, 
  //   enableCellNavigation: true,
  //   enableSorting: true,
  //   showHeaderRow: true,
  //   headerRowHeight: 30, 
  //   rowHeight: 40, 
  // };
}

  // fetchStockData(): void {
  //   this.stockService.getStockList().subscribe(data => {
  //     this.stockList = data.stocklist;
  //     console.log(this.stockList);  

 
  //     this.columnDefinitions = [
  //       { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 50 },
  //       { id: 'itemName', name: 'Name', field: 'itemName', sortable: true, maxWidth: 700 },
  //       { id: 'itemDescription', name: 'Description', field: 'itemDescription', sortable: true, maxWidth: 700 },
  //       { id: 'itemCategory', name: 'Category', field: 'itemCategory', sortable: true,maxWidth: 700 },
        
  //     ];
      

  //     // Populate dataset dynamically
  //     this.dataset = this.stockList.map((registration, index) => ({
  //       id: index + 1,
  //       itemName: registration.itemName,
  //       itemDescription: registration.itemDescription,
  //       itemCategory:registration.itemCategory,
       
  //     }));

  //     // Set grid options
  //     this.gridOptions = {
  //       enableAutoResize: true,
  //       enableCellNavigation: true,
  //       enableSorting: true,
  //       autoHeight: true, // Disable autoHeight to enable vertical scrolling
  //       explicitInitialization: true, // Explicit initialization is needed when using autoHeight or virtual scrolling
  //       showHeaderRow: true, // Show header row if needed
  //       headerRowHeight: 10, // Adjust header row height as needed
  //       rowHeight: 40, // Adjust row height as needed
  //       enableAsyncPostRender: true, // Enable async post render if needed
  //       enableVirtualRendering: true ,
  //       gridwidth:10,
  //       autoResize: {
  //         maxWidth: 700,// container DOM selector
  //       },
  //       headerRowBackgroundColor: 'purple', // Set header row background color
  //       headerRowTextColor: 'orange' // Set header row text color
  //     };

    
  //   });

  //   }

  //filter to be added 
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
  
  applyFilter() {
    if (this.selectedFilterType && this.searchQuery) {
      this.filteredDataset = this.stockList.filter(data => {
        const fieldValue = data[0][this.selectedFilterType];
       
        
      
          console.log("value",data[0][this.selectedFilterType])

        
            this.fieldValueString = data[0][this.selectedFilterType].toString().toLowerCase();

            this.searchQueryLower = this.searchQuery.toLowerCase();

          return this.fieldValueString==this.searchQueryLower;
        
        return false; 
      });
    } 
    this.stockList=this.filteredDataset
    this.dataTable()
    console.log("aa",this.filteredDataset)
  }


  dataTable(){
    this.columnDefinitions = [
        { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 50,  filterable: true, filter: { model: Filters.compoundInputNumber }},
        { id: 'itemName', name: 'Name', field: 'itemName', sortable: true, maxWidth: 200 ,filterable: true, filter: { model: Filters.compoundInputText } },
        { id: 'itemDescription', name: 'Description', field: 'itemDescription', sortable: true, maxWidth: 500, filterable: true, filter: { model: Filters.compoundInputText } }, 
        { id: 'itemCategory', name: 'Category', field: 'itemCategory', sortable: true,maxWidth: 200,filterable: true, filter: { model: Filters.compoundInputText }},
            
    ];
    


// this.dataset = this.page1Data.map((registrationArray, index) => {
// const registration = registrationArray[0];
// return {
// id: index + 1,
// landArea: registration ? registration.landArea : "", 
// State: registration ? registration.state : "",
// District: registration ? registration.selectedDistrict : "",
// Taluk: registration ? registration.selectedTaluk : "",
// Ward: registration ? registration.ward : "",
// SurveyNumber: registration ? registration.surveyNumber : "",
// SubdivisionNumber: registration ? registration.subdivisionNumber : "",
// typeOfOwnership: registration ? registration.ownership : "",
// LandUseType: registration ? registration.landUseType : "",

// };
// });
this.dataset = this.stockList.map((registration, index) => ({
  //  this.dataset = this.page1Data.map((registrationArray, index) => {
  //   const registration = registrationArray[0];
  //   return {
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


  