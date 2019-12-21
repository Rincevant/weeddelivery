import { Component, OnInit, Input } from '@angular/core';
import { ShopDTO } from 'src/app/Model/ShopDTO';
import { ActivatedRoute } from '@angular/router';
import { ShopServiceService } from 'src/app/Services/Shop/shop-service.service';
import { _ } from 'underscore';
import { CreateProductDTO, ProductDTO } from 'src/app/Model/ProductDTO';
import { first } from 'rxjs/operators';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css'],
})
export class ShopDetailsComponent implements OnInit {
  shopName: string;
  _filter: string = '';
  allProducts: ProductDTO[];
  filteredProducts: ProductDTO[];

  get filter(): string {
    return this._filter;
  }

  @Input() set filter(filter: string) {
    this._filter = filter;
    this.updateProducts();
  }

  constructor(private route: ActivatedRoute, private shopService: ShopServiceService, private productService: ProductsService) {}

  ngOnInit() {
    this.getShop();
  }

  getShop(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.shopService
      .getShopById(id)
      .pipe(first())
      .subscribe(shop => {
        if (shop) {
          this.shopName = shop.name;
          this.productService
            .getProductsByShop(id)
            .pipe(first())
            .subscribe(products => {
              this.allProducts = products;
              this.filteredProducts = this.allProducts;
            });
        }
      });
  }

  updateProducts(): void {
    if (this.filter == '') {
      this.filteredProducts = this.allProducts;
      return;
    }
    this.filteredProducts = _.filter(this.allProducts, x => {
      return x.name.toUpperCase().includes(this.filter.toUpperCase());
    });
  }
}
