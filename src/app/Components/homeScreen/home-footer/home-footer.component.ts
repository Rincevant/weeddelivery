import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/Services/Maps/maps.service';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css'],
})
export class HomeFooterComponent implements OnInit {
  constructor(private map: MapsService, private http: HttpClient) {}

  ngOnInit() {}
}
