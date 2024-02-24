import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockAvailabilityService {
  private stockAvailability: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  stockAvailability$: Observable<number> = this.stockAvailability.asObservable();

  constructor() { }

  updateStockAvailability(quantity: number) {
    this.stockAvailability.next(quantity);
    if (quantity === 0) {
      console.log('Out of stock');
    }
  }

  getStockAvailability(): number {
    return this.stockAvailability.value;
  }
}
