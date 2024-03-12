import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dialog',
  templateUrl: './graph-dialog.component.html',
  styleUrls:['./graph-dialog.component.css']
})
export class GraphDialogComponent implements OnInit {
  chart: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const allDates = new Set([
        ...this.data.history.map((entry: any) => entry.date),
        ...this.data.outgoingHistory.map((entry: any) => entry.date)
    ]);

    const historyQuantitiesMap = new Map(this.data.history.map((entry: any) => [entry.date, entry.quantity]));
    const outgoingQuantitiesMap = new Map(this.data.outgoingHistory.map((entry: any) => [entry.date, entry.quantity]));

    const labels = Array.from(allDates);
    const historyData = labels.map(date => historyQuantitiesMap.get(date) ?? null);
    const outgoingData = labels.map(date => outgoingQuantitiesMap.get(date) ?? null);

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock-In History Quantity',
                data: historyData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Stock-Dispatch History Quantity',
                data: outgoingData,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
}