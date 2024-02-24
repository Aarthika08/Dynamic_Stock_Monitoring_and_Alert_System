import { Component } from '@angular/core';
import { IncomingStockService } from './incoming-stock.service';

@Component({
  selector: 'app-incoming-stock',
  templateUrl: './incoming-stock.component.html',
  styleUrls: ['./incoming-stock.component.css']
})
export class IncomingStockComponent {

  item = {
    itemId: null,
    itemName: '',
    itemDescription: '',
    itemCategory: '',
    order_date: '',
    quantity: null,
    status: ''
  };

  constructor(private incomingStockService: IncomingStockService) { }

  addIncomingStock() {
    this.incomingStockService.addIncomingStock(this.item).subscribe(
      (response) => {
        alert('Incoming stock added successfully!');
        console.log('Incoming stock added successfully!', response);
        // Reset the form
        this.item.itemId = null;
        this.item.itemName = '';
        this.item.itemDescription = '';
        this.item.itemCategory = '';
        this.item.order_date = '';
        this.item.quantity = null;
        this.item.status = '';
        // this.item.modified_date = null;

      },
      (error) => {
        console.error('Error adding incoming stock:', error);
      }
    );
  }
}
