import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/Services/Network/network.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  username: string;
  password: string;

  constructor(private networkService: NetworkService, private router: Router) {}

  ngOnInit() {}

  connect() {
    this.networkService.login(this.username, this.password).subscribe(
      res => {
        this.networkService.AuthToken = res.tokenType + ' ' + res.accessToken;
        this.router.navigateByUrl('/Shops');
      },
      err => {
        console.log('ERROR LOGIN => ' + err);
      },
    );
  }
}
