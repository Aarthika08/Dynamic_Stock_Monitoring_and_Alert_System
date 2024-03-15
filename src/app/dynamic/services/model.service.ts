// model.service.ts
import { Injectable } from '@angular/core';
import { Trainer, Architect, Layer } from 'synaptic';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  public predictionOutput = new BehaviorSubject<any>(null);

  constructor(private dataService: DataService) { }

  trainModel() {
    this.dataService.fetchData().subscribe(data => {
      const trainingData = this.dataService.preprocessData(data);

      const inputSize = trainingData[0].input.length;
      const outputSize = trainingData[0].output.length;

      const inputLayer = new Layer(inputSize);
      const hiddenLayer = new Layer(8); // Example of a hidden layer with 8 neurons
      const outputLayer = new Layer(outputSize);

      inputLayer.project(hiddenLayer);
      hiddenLayer.project(outputLayer);

      const neuralNetwork = new Architect.Perceptron(inputSize, 8, outputSize);

      const trainer = new Trainer(neuralNetwork);
      trainer.train(trainingData);

      // Make a prediction after training
      const predictionInput = trainingData[0].input; // Example input for prediction
      const predictionOutput = neuralNetwork.activate(predictionInput);
      this.predictionOutput.next(predictionOutput);
    });
  }
}
