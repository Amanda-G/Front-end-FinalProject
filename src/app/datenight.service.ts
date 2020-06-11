import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatenightService {
  apiURL: string = "http://localhost:3000";
  headerApiKey: string = "a436b440d3msh9ac46586b778627p187c36jsn4338256144d4";
  headerHost: string = "tripadvisor1.p.rapidapi.com";
  constructor(private http: HttpClient) { }

  //backend to get the jokes from pgAdmin
  getAllItems(): any {
    return this.http.get(`${this.apiURL}/jokes`)
  }

  getFood(locationID: string): any {
    return this.http.get("https://tripadvisor1.p.rapidapi.com/restaurants/list",
      {
        params: {
          lang: "en_US",
          // location_id: "42139"
          location_id: locationID
        },
        headers: {
          "x-rapidapi-key": this.headerApiKey,
          "x-rapidapi-host": this.headerHost
        }
      }
    )
  }

  getLocation(locationString): any {
    return this.http.get("https://tripadvisor1.p.rapidapi.com/locations/search",
      {
        params: {
          // query: "lansing michigan"
          query: locationString
        },
        headers: {
          "x-rapidapi-key": this.headerApiKey,
          "x-rapidapi-host": this.headerHost

        }
      }
    )
  }

}
