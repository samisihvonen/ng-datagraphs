import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
const {weatherApiKey} = environment;
import { Observable } from "rxjs";
import { Chart, registerables } from 'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private baseUrl= 'https://weather.visualcrossing.com';
  private apiKey = `${environment.weatherApiKey}`;
  title="chart";
  public chart: any;
  days:any;
  tempMax:any;
  tempMin:any;
  points = 100;
  labels=[];

  constructor( private http:HttpClient){
    this.labels =[];
    this.days = [];
    this.tempMax =[];
    this.tempMin =[];
  }

  ngOnInit() {
    this.getData();
    this.createChart();
  }

  getData(){
    this.http.get(`${this.baseUrl}/VisualCrossingWebServices/rest/services/timeline/espoo?unitGroup=uk&key=${this.apiKey}&contentType=json`).subscribe((res:any)=>{
      this.tempMax = res.days.tempmax;
      this.tempMin = res.days.tempmin;
      this.days = res.days.datetime;
      console.log(res.days);
    })
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
            backgroundColor: 'red'
          },
          {
            label: "Min Temp",
            data:this.tempMin,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
    })
  }
};