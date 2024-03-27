import { Component, OnInit } from '@angular/core';
//  import { StockmonitorService } from '../stock-monitor/stock-monitor.service';
//import {TensorflowService} from '../services/tensorflow.service';
// declare var ml5: any;
// import { LinearRegression } from '../linear-regression';
declare let Email: any;

@Component({
  selector: 'app-stock-monitor',
  templateUrl: './stock-monitor.component.html',
  styleUrls: ['./stock-monitor.component.css']
})
export class StockMonitorComponent {
  // stockData: any[] = [];

  // constructor(private stockmonitorService: StockmonitorService) { }

  // ngOnInit(): void {
  //   this.fetchStockData();
  // }

  // fetchStockData(): void {
  //   this.stockmonitorService.fetchStockData().subscribe(
  //     (data: any[]) => {
  //       // Handle the fetched data here
  //       console.log(data);
  //     },
  //     (error) => {
  //       // Handle error if any
  //       console.error('Error fetching stock data:', error);
  //     }
  //   );
  // }

   constructor() { }

   
  sendEmail() {
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "19ifte048@ldc.edu.in",
      Password: "0C589BEA17D93DD3B70BE7D58EBE02BC3CBA",
      To: 'maarthika01@gmail.com',
      From: "19ifte048@ldc.edu.in",
      Subject: "This is the subject",
      Body: "And this is the body testing1"
    }).then(
      (message: unknown) => {
        console.log(message); // Log the message to the console
        alert("Email sent successfully");
      }
    ).catch((error:any) => {
      console.error('Error sending email:', error);
      alert("Error sending email. Please try again later.");
    });
  }
}
