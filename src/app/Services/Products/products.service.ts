import { Injectable } from '@angular/core';
import { NetworkService } from '../Network/network.service';
import { Observable } from 'rxjs';
import {CreateProductDTO, ProductDTO} from 'src/app/Model/ProductDTO';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private GET_PRODUCTS_SHOP_URL = 'product';

  constructor(private networkService: NetworkService) {}

  getProductsByShop(shopId: string): Observable<ProductDTO[]> {
    return this.networkService.get<ProductDTO[]>(this.GET_PRODUCTS_SHOP_URL + '/' + shopId + '/shop');
  }

  getProductForUser(): Observable<ProductDTO[]> {
    return this.networkService.get<ProductDTO[]>(this.GET_PRODUCTS_SHOP_URL)
  }

  getProductById(id: string): Observable<ProductDTO> {
    return this.networkService.get<ProductDTO>(this.GET_PRODUCTS_SHOP_URL + '/' + id)
  }

  createProduct(dto: CreateProductDTO): Observable<ProductDTO> {
    return this.networkService.post<ProductDTO>(this.GET_PRODUCTS_SHOP_URL, dto)
  }

  updateProduct(dto: CreateProductDTO, id: number): Observable<ProductDTO> {
    return this.networkService.put<ProductDTO>(this.GET_PRODUCTS_SHOP_URL + '/' + id, dto)
  }
}
