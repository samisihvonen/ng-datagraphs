import { Component, OnInit } from '@angular/core';
import { ChartService } from '../service/chart.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private baseUrl= 'https://weather.visualcrossing.com';
  // private apiKey = `${environment.weatherApiKey}`|| "HWA4Z9EFNGWAQYEVACCK98873";
  private apiKey = "HWA4Z9EFNGWAQYEVACCK98873";

  title="chart";
  public chart: any;
  resObj:any;
  days=[];
  tempMax=[];
  tempMin=[];
  temperature:number =0;
  feelsLike:number=0;

  constructor(private chartService:ChartService){}

  ngOnInit():void{
    this.getData();
    // this.createChart();
  }
  createChart(){
    this.chart = new Chart("graphChart", {
      type: 'line',
      data: {
        labels: this.days,
	       datasets: [
          {
            label: "Max Temp",
            data:this.tempMax,
            borderColor: 'red',
            borderWidth: 3,
            pointBackgroundColor:"red",
          },
          {
            label: "Min Temp",
            data:this.tempMin,
            borderWidth: 3,
            borderColor:'blue',
            pointBackgroundColor:"blue"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio:false,
        scales: {
          y: {
            beginAtZero: true,
            min:-30,
            max:35,
          },
          x:{
            beginAtZero: false,
            max:100,
          }
        },
      },
    })
  }

    handleResponse(res: Object) {
    this.resObj = res;
    console.log('response',res)

    this.days = this.resObj.days.map((d:any)=>d.datetime)
    this.tempMax = this.resObj.days.map((el:any)=>el.tempmax)
    this.tempMin = this.resObj.days.map((el:any)=>el.tempmin)
    this.temperature = this.resObj.currentConditions.temp;
    this.feelsLike = this.resObj.currentConditions.feelslike;

    this.createChart();
  }

  getData(){
    this.chartService.getWeatherData().subscribe({
      next: (res) => this.handleResponse(res),
      error: (err) => console.log(err),
      complete: () => console.log('done getting weather data'),
    });
  }
}
