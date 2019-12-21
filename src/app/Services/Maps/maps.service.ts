import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  ipAddress: any;
  latitudeClient: any;
  longitudeClient: any;

  latitudeShop: any;
  longitudeShop: any;
  dataLocation: any;
  constructor(private http: HttpClient) {}

  public getLocationFromIpUser() {
    return this.http.get('https://ipapi.co/' + this.ipAddress.ip + '/json/');
  }

  public setIpAddress(ipUser) {
    this.ipAddress = ipUser;
  }

  public setLatitudeClient(latitude) {
    this.latitudeClient = latitude;
  }

  public setLongitudeClient(longitude) {
    this.longitudeClient = longitude;
  }

  public getLatitudeClient() {
    return this.latitudeClient;
  }

  public getLongitudeClient() {
    return this.longitudeClient;
  }

  public setLatitudeShop(latitude) {
    this.latitudeShop = latitude;
  }

  public setLongitudeShop(longitude) {
    this.longitudeShop = longitude;
  }

  public getLatitudeShop() {
    return this.latitudeShop;
  }

  public getLongitudeShop() {
    return this.longitudeShop;
  }

  getLocationShopsFromAddress(shopAddress) {
    return this.http.get('https://eu1.locationiq.com/v1/search.php?key=419810676b3a8c&q=' + shopAddress + '&format=json');
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    console.log(lat1, lon1, lat2, lon2)
    var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
    dist = dist * 180/Math.PI;    
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344    
    return dist;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}
