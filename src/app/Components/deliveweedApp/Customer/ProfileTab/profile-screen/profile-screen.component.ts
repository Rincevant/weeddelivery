import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/Services/Network/network.service';
import { UserService } from 'src/app/Services/User/user.service';
import { first } from 'rxjs/operators';
import { MapsService } from 'src/app/Services/Maps/maps.service';
import { ShopServiceService } from 'src/app/Services/Shop/shop-service.service';
import { UserDTO } from 'src/app/Model/UserDTO';

enum state {
  profile = 0,
  updating = 1,
  shop = 2,
}

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css'],
})
export class ProfileScreenComponent implements OnInit {
  public updating = false;

  // UTILISATEUR
  public state: state = state.profile;
  public newPassword = '';
  public user: UserDTO;
  public userDataAvaible = false;

  // CREATION MAGASIN
  public shopName = '';
  public shopAddress = '';
  public shopLat: string;
  public shopLon: string;
  public base64textString: String = '';
  userName: 'UserName';
  email: 'Email';

  constructor(
    private UserService: UserService,
    private networkService: NetworkService,
    private mapService: MapsService,
    private shopService: ShopServiceService,
  ) {}

  ngOnInit() {
    this.UserService.getCurentUser()
      .pipe(first())
      .subscribe(
        next => {
          if (next) {
            const jsonInfo = JSON.parse(JSON.stringify(next));
            this.user = jsonInfo;
            this.convertUserType(jsonInfo.roles[0]);
            this.userDataAvaible = true;
          }
        },
        err => {
          console.log('Error get current user => ' + JSON.stringify(err));
        },
      );
  }

  convertUserType(userType) {
    switch (userType) {
      case 'ROLE_CUSTOMER':
        this.user.roles[0] = 'Customer';
        break;
      case 'ROLE_DELIVER':
        this.user.roles[0] = 'Deliver';
        break;
      case 'ROLE_SELLER':
        this.user.roles[0] = 'Seller';
        break;
      default:
        break;
    }
  }

  setState(stateIn: state) {
    this.state = stateIn;
  }

  save() {
    const body = { userName: this.user.userName, email: this.user.email, roles: [this.user.roles[0]] };
    console.log(body);
    this.UserService.updateCurrentUser(body);
    this.UserService.setStatus(this.user.roles[0]);
    this.setState(0);
  }

  registerShop() {
    console.log('enregistrement du magasin');

    if (this.shopAddress !== '') {
      this.calculatingLatitudeEtLongitudeShop();
    }
  }

  // Fonction a implementer dans la creation de magasin
  calculatingLatitudeEtLongitudeShop() {
    this.mapService.getLocationShopsFromAddress(this.shopAddress).subscribe(data => {
      const jsonInfo = JSON.parse(JSON.stringify(data[0]));
      this.shopLat = jsonInfo.lat;
      this.shopLon = jsonInfo.lon;
      if (
        this.shopAddress !== '' &&
        this.shopName !== '' &&
        this.base64textString !== '' &&
        this.shopLat !== undefined &&
        this.shopLon !== undefined
      ) {
        this.shopService.addShop(this.shopName, this.shopAddress, this.shopLat, this.shopLon, this.base64textString);
      } else {
        console.log('Not able to register shop');
      }
    });
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textString = 'data:image/jpeg;base64,' + this.base64textString;
    console.log(this.base64textString);
  }
}
