import { Injectable } from '@angular/core';
import { ShopDTO, ShopLightDTO } from '../../Model/ShopDTO';
import { Observable, of } from 'rxjs';
import { NetworkService } from '../Network/network.service';
import { CreateProductDTO } from '../../Model/ProductDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShopServiceService {
  private URL_GET_SHOP = 'shop';
  private URL_GET_SHOP_PICTURE = 'picture';
  private BASE_PATH = 'http://82.64.61.155:6666/weedapiV1/';
  constructor(private networkService: NetworkService, private httpService: HttpClient) {}

  getAllShops(): Observable<ShopDTO[]> {
    return this.networkService.get(this.URL_GET_SHOP);
  }

  getShopById(id: string): Observable<ShopDTO> {
    return this.networkService.get(this.URL_GET_SHOP + '/' + id);
  }

  getShopPicture(pictureId: number): Observable<string> {
    return this.networkService.get(this.URL_GET_SHOP_PICTURE + '/' + pictureId);
  }

  searchShop(query: string): Observable<ShopLightDTO[]> {
    return this.networkService.get(this.URL_GET_SHOP + '/search/' + query);
  }

  addShop(shopName, shopAddress, shopLat, shopLon, base64textString) {
    console.log('REGISTERING');
    this.networkService
      .post('shop', {
        name: shopName,
        address: shopAddress,
        shopLat: shopLat,
        shopLon: shopLon,
        picture: base64textString,
        assossiatedProducts: [],
      })
      .subscribe(res => {
        console.log(res);
      });
  }
}
