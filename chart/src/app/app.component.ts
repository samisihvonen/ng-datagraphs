import { Component, OnInit } from '@angular/core';
// import { environment } from 'src/environments/environment';
// const {weatherApiKey} = environment;
import { ChartService } from './service/chart.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

};