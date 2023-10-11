import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Chart from 'chart.js';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-report',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit, AfterViewInit {
  highestState: string = '';
  lowestState: string = '';
  mostAffectedState: string = '';
  showResults: boolean = false;
  data: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.handleFileInput();
  }

  ngAfterViewInit() {
    // Ensure the DOM is ready before creating the chart
    setTimeout(() => {
      this.createPieChart(this.data);
    }, 0);
  }

  handleFileInput() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const selectedFile = fileInput.files[0];

      Papa.parse(selectedFile, {
        header: true,
        complete: (result) => {
          this.data = result.data;
          this.showResults = true;
          this.calculateStatistics(); // Call calculateStatistics after data is loaded
          this.createPieChart(this.data);
        },
      });
    }
  }

  calculateStatistics() {
    let maxAccumulated = -1;
    let minAccumulated = Number.MAX_SAFE_INTEGER;
    let mostAffectedState = '';
    let mostAffectedRate = -1; // To track the highest average rate
    const startDate = new Date('12/27/20'); // Start date
    const endDate = new Date('4/27/21'); // End date

    for (const row of this.data) {
      const state = row['Province_State'];
      let accumulated = 0;

      // Iterate through the dates and sum the accumulated values
      for (const dateKey of Object.keys(row)) {
        const date = new Date(dateKey);

        if (date >= startDate && date <= endDate) {
          accumulated += Number(row[dateKey]);
        }
      }

      // Calculate the average rate
      const daysDifference =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      const average = accumulated / daysDifference;

      if (accumulated > maxAccumulated) {
        maxAccumulated = accumulated;
        this.highestState = state;
      }

      if (accumulated < minAccumulated) {
        minAccumulated = accumulated;
        this.lowestState = state;
      }

      if (average > mostAffectedRate) {
        mostAffectedRate = average;
        mostAffectedState = state;
      }
    }

    this.mostAffectedState = mostAffectedState;
  }

  createPieChart(data: any) {
    const canvas: any = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');

    const stateDeaths: { [key: string]: number } = {};

    let highestState = ''; // Initialize the highest state
    let highestDeaths = -1;

    let lowestState = ''; // Initialize the lowest state
    let lowestDeaths = Number.MAX_SAFE_INTEGER;

    let mostAffectedState = ''; // Initialize the most affected state
    let highestAverage = -1;

    for (const row of data) {
      const state = row['Province_State'];
      const deaths = parseInt(row['4/27/21']); // Use the latest date (4/27/21) for calculations

      // Calculate total deaths by state
      if (stateDeaths[state]) {
        stateDeaths[state] += deaths;
      } else {
        stateDeaths[state] = deaths;
      }

      // Calculate state with highest accumulated deaths
      if (deaths > highestDeaths) {
        highestDeaths = deaths;
        highestState = state;
      }

      // Calculate state with lowest accumulated deaths
      if (deaths < lowestDeaths) {
        lowestDeaths = deaths;
        lowestState = state;
      }

      // Calculate most affected state (highest average)
      const startDate = new Date('12/27/20');
      const endDate = new Date('4/27/21');
      const daysDifference =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      const average = deaths / daysDifference;

      if (average > highestAverage) {
        highestAverage = average;
        mostAffectedState = state;
      }
    }

    // Convert stateDeaths object into arrays for chart data
    const labels = Object.keys(stateDeaths);
    const values = Object.values(stateDeaths);
    const colors = this.getRandomColorArray(labels.length);

    // Create the pie chart
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels as string[],
        datasets: [
          {
            data: values as number[],
            backgroundColor: colors as string[],
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
      },
    });
  }

  getRandomColorArray(length: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < length; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(color);
    }
    return colors;
  }
}
