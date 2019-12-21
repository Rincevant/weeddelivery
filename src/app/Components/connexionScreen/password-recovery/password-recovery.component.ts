import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/Services/Network/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],
})
export class PasswordRecoveryComponent implements OnInit {
  email: any = '';
  username: any = '';

  constructor(private networkService: NetworkService, private router: Router) {}

  ngOnInit() {}

  recuperer() {
    this.networkService.recupererPass(this.email, this.username).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('/Connexion');
      },
      err => {
        console.log('ERROR LOGIN => ' + err);
      },
    );
  }
}
