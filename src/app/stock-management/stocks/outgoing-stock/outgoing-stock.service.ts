import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockAvailabilityService } from '../stock-availability/stock-availability.service';

@Injectable({
  providedIn: 'root'
})
export class OutgoingStockService {
  private outgoingStock: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  outgoingStock$: Observable<number> = this.outgoingStock.asObservable();

  constructor(private stockAvailabilityService: StockAvailabilityService) { }

  removeOutgoingStock(quantity: number) {
    const currentAvailability = this.stockAvailabilityService.getStockAvailability();
    if (currentAvailability >= quantity) {
      this.outgoingStock.next(this.outgoingStock.value + quantity);
      this.stockAvailabilityService.updateStockAvailability(currentAvailability - quantity);
    } else {
      console.error('Out of stock');
    }
  }
}
