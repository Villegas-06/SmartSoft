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
    console.log('ngOnInit is called');
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

    for (const row of this.data) {
      const accumulated = Number(row['12/27/20']); // Convert to number
      const state = row['Province_State'];

      if (accumulated > maxAccumulated) {
        maxAccumulated = accumulated;
        this.highestState = state;
      }

      if (accumulated < minAccumulated) {
        minAccumulated = accumulated;
        this.lowestState = state;
      }

      // Calculate the most affected state (using a separate variable)
      const startDate = new Date('12/27/20');
      const endDate = new Date('4/27/21');
      const daysDifference =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      const average = accumulated / daysDifference;

      if (average > Number(mostAffectedState)) {
        mostAffectedState = state;
      }
    }

    this.mostAffectedState = mostAffectedState;

    console.log('Highest State:', this.highestState);
    console.log('Lowest State:', this.lowestState);
    console.log('Most Affected State:', this.mostAffectedState);
  }

  createPieChart(data: any) {
    const canvas: any = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    console.log(ctx);

    const stateDeaths: { [key: string]: number } = {};

    // Calculate death counts by state
    for (const row of this.data) {
      console.log('createPieChart is called');

      const state = row['Province_State'];
      const deaths = parseInt(row['12/27/20']);

      if (stateDeaths[state]) {
        stateDeaths[state] += deaths;
      } else {
        stateDeaths[state] = deaths;
      }
    }

    // Convert stateDeaths object into arrays for chart data
    const labels = Object.keys(stateDeaths);
    const values = Object.values(stateDeaths);
    const colors = this.getRandomColorArray(labels.length);

    console.log(labels);
    console.log(values);
    console.log(colors);

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
