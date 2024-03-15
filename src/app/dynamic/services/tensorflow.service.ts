// // tensorflow.service.ts

// import { Injectable } from '@angular/core';
// import * as tf from '@tensorflow/tfjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TensorflowService {

//   async classifyImage(imageElement: HTMLImageElement): Promise<string[]> {
//     // Load the MobileNet model
//     const model = await tf.loadLayersModel('https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/4');

//     // Pre-process the image
//     const img = tf.browser.fromPixels(imageElement).resizeBilinear([224, 224]).toFloat();
//     const offset = tf.scalar(127.5);
//     const normalized = img.sub(offset).div(offset).expandDims();

//     // Make predictions
//     const predictions = await model.predict(normalized) as tf.Tensor;
//     const top5 = await this.getTopKClasses(predictions, 5);

//     return top5;
//   }

//   async getTopKClasses(predictions: tf.Tensor, k: number): Promise<string[]> {
//     const values = await predictions.data();
//     const indices = await tf.topk(predictions, k).indices.data();
//     const labels = await this.loadLabels();

//     return Array.from(indices).map(index => labels[index]);
//   }

//   async loadLabels(): Promise<string[]> {
//     const response = await fetch('https://storage.googleapis.com/download.tensorflow.org/data/imagenet_class_index.json');
//     const data = await response.json();
//     return Object.values(data).map((item: any) => item[1]);
//   }
// }
