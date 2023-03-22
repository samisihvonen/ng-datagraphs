import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const {weatherApiKey} = environment;
@Injectable({
  providedIn:'root'
})

export class DataService {
  private baseUrl= 'https://weather.visualcrossing.com';
  private apiKey = `${environment.weatherApiKey}`;
  constructor(private http:HttpClient) { }
  dailyData(){
    return this.http.get(`${this.baseUrl}/VisualCrossingWebServices/rest/services/timeline/espoo?unitGroup=uk&key=${this.apiKey}&contentType=json`).subscribe((res)=>{
      console.log(res);
    })
  }

}
