export class CreateProductDTO {
  name: string;
  description: string;
  price: number;
  picture: string;
}

export class ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  pictId: string;
}
