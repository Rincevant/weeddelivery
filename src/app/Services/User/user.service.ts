import { Injectable, OnInit } from '@angular/core';
import { NetworkService } from '../Network/network.service';
import { Observable, Subject } from 'rxjs';
import { UserDTO } from 'src/app/Model/UserDTO';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private GET_CURRENT_USER: string = 'user';
  private POST_UPDATE_CURRENT_USER: string = 'user';

  public status: string;

  private userStatusSubject: Subject<string> = new Subject<string>();
  public userStatusObservable: Observable<string> = this.userStatusSubject;

  constructor(private networkService: NetworkService) {}

  getCurentUser(): Observable<UserDTO> {
    return this.networkService.get(this.GET_CURRENT_USER);
  }

  updateCurrentUser(data) {
    return this.networkService
      .put(this.POST_UPDATE_CURRENT_USER, { userName: data.userName, email: data.email, roles: data.roles })
      .pipe(first())
      .subscribe(
        res => console.log('RESULT UPDATE => ' + JSON.stringify(res)),
        err => console.log('ERROR UPDATE => ' + JSON.stringify(err)),
      );
  }

  setStatus(newStatus) {
    this.status = newStatus;
    this.userStatusSubject.next(this.status);
  }
}
