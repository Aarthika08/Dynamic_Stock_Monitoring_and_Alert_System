import { Component } from '@angular/core';

@Component({
  selector: 'app-slick',
  template: '<angular-slickgrid gridId="grid1" [columnDefinitions]="columnDefinitions" [gridOptions]="gridOptions" [dataset]="dataset"></angular-slickgrid>',
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
}
