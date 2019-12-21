import { CreateProductDTO } from './ProductDTO';

export class ShopDTO {
  public name: string;
  public pictId: number;
  public picture: string;
  public address: string;
  public latitude: string;
  public longitude: string;
  public distance: string;
  public id: number;
  public products: CreateProductDTO[];
  toString = (): string => {
    return this.name;
  };
}

export class ShopLightDTO {
  public name: string;
  public id: number;
}
