import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsService } from './Services/Maps/maps.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weedFront';

  constructor(private http: HttpClient, private map: MapsService) {
    this.http
      .get<{ ip: string }>('https://jsonip.com')
      .pipe(first())
      .subscribe(data => {
        console.log(data)
        this.map.setIpAddress(data);
        this.setLatitudeEtLongitudeClient();
      });
  }

  //SET LATITUDE LONGITUDE OF USER AT CONNEXION
  setLatitudeEtLongitudeClient() {
    this.map.getLocationFromIpUser().subscribe(data => {
      console.log("ip result : ")
      console.log(data)
      var jsonInfo = JSON.parse(JSON.stringify(data));    
      localStorage.setItem('latitude', jsonInfo.latitude);
      localStorage.setItem('longitude', jsonInfo.longitude);
    });
  }
}
