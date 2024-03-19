import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as synaptic from 'synaptic';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  predictStockStatus() {
    throw new Error('Method not implemented.');
  }

  private neuralNetwork: any;
  private apiUrl = 'http://localhost:5984/stocks/6bf419fc30b6d006073b2fb0df00fd9d';

  constructor(private http: HttpClient) {
    // Define and initialize your neural network architecture
    this.neuralNetwork = new synaptic.Architect.Perceptron(2, 5, 1); // Example architecture
  }

  fetchAndProcessData(): void {
    // Fetch data from the API
    this.http.get<any>(this.apiUrl).subscribe(
      (stockData: any) => {
        console.log('Fetched stock data:', stockData);
        
        // Prepare training data
        const trainingData = this.prepareTrainingData(stockData);

        // Train the model with the fetched data
        this.trainModel(trainingData);
      },
      error => {
        console.error('Error fetching stock data:', error);
      }
    );
  }

  prepareTrainingData(stockData: any): any[] {
    // Process the fetched data and prepare it for training
    // You need to extract and format the input and output data appropriately
    // For example, if you want to use stock quantity and sales trend as input features,
    // and stock status as the output, you need to map the data accordingly.

    // Here's a dummy example:
    const trainingData = stockData.map((item: any) => ({
      input: [item.stockQuantity, item.salesTrend],
      output: item.stockStatus // Assuming stockStatus is already formatted as 0 or 1
    }));

    return trainingData;
  }

  trainModel(trainingData: any[]): void {
    // Train your neural network using the provided training data
    const trainer = new synaptic.Trainer(this.neuralNetwork);
    trainer.train(trainingData);
  }

  predict(stockQuantity: number, salesTrend: number): number {
    // Make predictions using the trained neural network
    const output = this.neuralNetwork.activate([stockQuantity, salesTrend]);
    return output[0]; // Output represents the probability of stock status change
  }
}
