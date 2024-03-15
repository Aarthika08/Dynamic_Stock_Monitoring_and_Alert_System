// prediction.component.ts
import { Component, OnInit } from '@angular/core';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  predictionOutput: any;

  constructor(private modelService: ModelService) { }

  ngOnInit(): void {
    this.modelService.trainModel();
    // Assuming the prediction output will be updated asynchronously after training
    this.modelService.predictionOutput.subscribe((output: any) => {
      this.predictionOutput = output;
    });
  }
}
