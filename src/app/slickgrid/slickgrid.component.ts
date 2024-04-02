import { Component } from '@angular/core';

@Component({
  selector: 'app-slick',
  // template: '<angular-slickgrid gridId="grid1" [columnDefinitions]="columnDefinitions" [gridOptions]="gridOptions" [dataset]="dataset"></angular-slickgrid>',
 templateUrl:'./slickgrid.component.html',
   styleUrls: ['./slickgrid.component.css']
})

export class slickgridComponent {
 
  title = 'slickgridtest';
  columnDefinitions = [
    { id: 'id', name: 'ID', field: 'id', sortable: true },
    { id: 'title', name: 'Title', field: 'title', sortable: true },
    { id: 'duration', name: 'Duration', field: 'duration', sortable: true }
  ];

  gridOptions = {
    enableAutoResize: true,
    enableCellNavigation: true,
    enableSorting: true
  };

  dataset =  [
    { id: 1, title: 'Task 1', duration: 5 },
    { id: 2, title: 'Task 2', duration: 10 },
    { id: 3, title: 'Task 3', duration: 15 },
  ];


  //filter to be added 
  dataTable(){
    this.columnDefinitions = [
      { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 90,  filterable: true, filter: { model: Filters.compoundInputNumber }},
      { id: 'landArea', name: 'Land Area', field: 'landArea', sortable: true, maxWidth: 90, filterable: true, filter: { model: Filters.compoundInputNumber } },
      { id: 'State', name: 'State', field: 'State', sortable: true, maxWidth: 110, filterable: true, filter: { model: Filters.compoundInputText } },
      { id: 'District', name: 'District', field: 'District', sortable: true,maxWidth: 110,  filterable: true, filter: { model: Filters.compoundInputText }},
      { id: 'Taluk', name: 'Taluk', field: 'Taluk', sortable: true, maxWidth: 150  ,filterable: true, filter: { model: Filters.compoundInputText }},
      { id: 'Ward', name: 'Ward', field: 'Ward', sortable: true, maxWidth: 90,  filterable: true, filter: { model: Filters.compoundInputNumber }},
      { id: 'SurveyNumber', name: 'Survey Number', field: 'SurveyNumber', sortable: true, maxWidth: 90 ,  filterable: true, filter: { model: Filters.compoundInputNumber }},
      { id: 'SubdivisionNumber', name: 'Subdivision Number', field: 'SubdivisionNumber', sortable: true, maxWidth: 90 ,  filterable: true, filter: { model: Filters.compoundInputNumber }},
      { id: 'typeOfOwnership', name: 'Type of Ownership', field: 'typeOfOwnership', sortable: true, maxWidth: 150,  filterable: true, filter: { model: Filters.compoundInputText }  },
      { id: 'LandUseType', name: 'Land Use Type', field: 'LandUseType', sortable: true, maxWidth: 150, filterable: true, filter: { model: Filters.compoundInputText }},
      {
        id: 'action', name: 'Actions', field: 'action', sortable: false, maxWidth: 110,
        formatter: updateFormatter, onCellClick: (event:any,row:any) => {
          if (event) {
            this.showAddNewForm(this.page1Data[row.row][0])
          }
        }
        
      },
      {
        id: 'ownership', name: 'Ownership', field: 'ownership', sortable: false, maxWidth: 110,
        formatter: viewFormatter, onCellClick: (event:any,row:any) => {
          if (event) {
            
            this.showOwnersDetailsDialog(this.page1Data[row.row])
          }
        }
        
      },
      {
        id: 'map', name: 'Map', field: 'map', sortable: false, maxWidth: 110,
        formatter: mapFormatter, onCellClick: (event:any,row:any) => {
          if (event) {
            
            this.showMapDialog(this.page1Data[row.row])
          }
        }
        
      }
      
      
    ];
    


this.dataset = this.page1Data.map((registrationArray, index) => {
const registration = registrationArray[0];
return {
id: index + 1,
landArea: registration ? registration.landArea : "", 
State: registration ? registration.state : "",
District: registration ? registration.selectedDistrict : "",
Taluk: registration ? registration.selectedTaluk : "",
Ward: registration ? registration.ward : "",
SurveyNumber: registration ? registration.surveyNumber : "",
SubdivisionNumber: registration ? registration.subdivisionNumber : "",
typeOfOwnership: registration ? registration.ownership : "",
LandUseType: registration ? registration.landUseType : "",

};
});

   
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
        maxWidth: 1420,
        maxHeight:500
      },
    
  } 
  }

  
}
