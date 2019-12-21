import { Component, OnInit, Input } from '@angular/core';
import { ShopServiceService } from 'src/app/Services/Shop/shop-service.service';
import { ShopDTO } from 'src/app/Model/ShopDTO';
import { _ } from 'underscore';
import { first } from 'rxjs/operators';
import { MapsService } from 'src/app/Services/Maps/maps.service';
import { promise } from 'protractor';

import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent implements OnInit {
  constructor(private shopService: ShopServiceService, private mapService: MapsService) {}

  public allNextShops: ShopDTO[];
  public _filter: string = '';
  public shopsSubject: Subject<ShopDTO[]> = new Subject<ShopDTO[]>();
  public filteredNextShops: ShopDTO[];
  public lat2: any;
  public lon2: any;

  get shopFilter(): string {
    return this._filter;
  }

  @Input()
  set shopFilter(filter: string) {
    this._filter = filter;
    this.updateFilteredShops();
  }

  ngOnInit() {
    this.shopsSubject.subscribe(shops => {
      this.filteredNextShops = shops;
      this.updateFilteredShops();
    });

    this.shopService
      .getAllShops()
      .pipe(first())
      .subscribe(
        next => {
          if (next) {
            console.log(next)
            this.allNextShops = next;

            //Traitement des magasins par distance
            this.filterShopByDistance();
            this.shopsSubject.next(this.allNextShops);

            //Getting pictures one by one from db
            this.allNextShops.forEach((shop, i) => {
              this.shopService
                .getShopPicture(shop.pictId)
                .pipe(first())
                .subscribe(pictureObj => {
                  this.allNextShops[i].picture = pictureObj['picture'];
                  this.shopsSubject.next(this.allNextShops);
                });
            });
          }
        },
        err => {
          console.log('Error get all shops => ' + JSON.stringify(err));
        },
      );
  }

  private updateFilteredShops(): void {
    if (this.shopFilter == '') {
      this.filteredNextShops = this.allNextShops;
      return;
    }
    this.filteredNextShops = _.filter(this.allNextShops, x => {
      return x.name.toUpperCase().includes(this.shopFilter.toUpperCase());
    });
  }

  filterShopByDistance() {
    let i = 0;
    var filterShop: ShopDTO[] = [];
    this.allNextShops.forEach(element => {
      var distanceShop = this.mapService.getDistanceFromLatLonInKm(
        localStorage.getItem('latitude'),
        localStorage.getItem('longitude'),
        element.latitude,
        element.longitude,
      );
      console.log(distanceShop)      
      var distanceShopString = distanceShop.toFixed(2);
      this.allNextShops[i].distance = distanceShopString;
      if (distanceShop < 10000) {
        filterShop.push(element);
      }
      i++;
    });
    this.allNextShops = filterShop;
    console.log(this.allNextShops)
  }
}
