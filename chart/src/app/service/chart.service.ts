import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';

const apiKey = "HWA4Z9EFNGWAQYEVACCK98873";

@Injectable({
  providedIn:'root'
})
// const {weatherApiKey} = environment;

export class ChartService {
  baseUrl:string = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/espoo?unitGroup=uk&key=${apiKey}&contentType=json`;


  constructor(private http:HttpClient) { }

  getWeatherData(){
    return this.http.get(this.baseUrl)
  }
}
