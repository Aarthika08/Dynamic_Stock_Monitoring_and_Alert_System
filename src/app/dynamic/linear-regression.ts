// linear-regression.ts

export class LinearRegression {
    private slope!: number;
    private intercept!: number;
  
    train(x: number[], y: number[]): void {
      const n = x.length;
      let sumX = 0;
      let sumY = 0;
      let sumXY = 0;
      let sumX2 = 0;
  
      for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
      }
  
      this.slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      this.intercept = (sumY - this.slope * sumX) / n;
    }
  
    predict(x: number): number {
      return this.slope * x + this.intercept;
    }
  }
  