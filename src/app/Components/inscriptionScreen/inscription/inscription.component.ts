import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/Services/Network/network.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  SIGNUP_PATH: string = 'auth/signup/';

  userName: string = '';
  email: string = '';
  password: string = '';
  status: string = '';

  errorText: string = '';
  errorVisible: boolean = false;

  constructor(private networkService: NetworkService, private router: Router) {}

  ngOnInit() {}

  signUp(): void {
    let body = { username: this.userName, email: this.email, role: [this.status], password: this.password };
    console.log('body => ' + JSON.stringify(body));

    this.networkService
      .post(this.SIGNUP_PATH, { username: this.userName, email: this.email, role: [this.status], password: this.password })
      .pipe(first())
      .subscribe(
        res => this.router.navigateByUrl('/Connexion'),
        err => this.notifyError(err),
      );
  }

  notifyError(err) {
    console.log(err);
    this.errorText = err.error;
    this.errorVisible = true;

    setTimeout(() => (this.errorVisible = false), 5000);
  }
}
