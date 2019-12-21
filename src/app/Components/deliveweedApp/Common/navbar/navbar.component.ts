import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User/user.service';
import { first } from 'rxjs/operators';

enum statusUser {
  customer = 0,
  deliver = 1,
  seller = 2,
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public statusUser: number;

  constructor(private UserService: UserService) {}

  ngOnInit() {
    this.UserService.userStatusObservable.subscribe(res => {
      if (res == 'Customer') this.statusUser = 0;
      else if (res == 'Deliver') this.statusUser = 1;
      else if (res == 'Seller') this.statusUser = 2;
    });

    this.UserService.getCurentUser()
      .pipe(first())
      .subscribe(
        next => {
          if (next) {
            console.log('User type :');
            console.log(next.roles[0]);
            this.setStatusUser(next.roles[0]);
          }
        },
        err => {
          console.log('Error get current user => ' + JSON.stringify(err));
          this.statusUser = 2
        },
      );
  }

  setStatusUser(status) {
    switch (status) {
      case 'ROLE_CUSTOMER':
        this.statusUser = 0;
        break;
      case 'ROLE_DELIVER':
        this.statusUser = 1;
        break;
      case 'ROLE_SELLER':
        this.statusUser = 2;
        break;
      default:
        break;
    }
  }
}
