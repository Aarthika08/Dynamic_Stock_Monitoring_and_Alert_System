import { Component, OnInit } from '@angular/core';
import { StockAvailabilityService } from './stock-availability.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-availability',
  templateUrl: './stock-availability.component.html',
  styleUrls: ['./stock-availability.component.css']
})
export class StockAvailabilityComponent implements OnInit {
  stockAvailability$!: Observable<number>;

  constructor(private stockAvailabilityService: StockAvailabilityService) { }

  ngOnInit(): void {
    this.stockAvailability$ = this.stockAvailabilityService.stockAvailability$;
  }
}
