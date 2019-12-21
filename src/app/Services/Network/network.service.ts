import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ResponseLoginDTO } from 'src/app/Model/responseLoginDTO';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  });
  //private BASE_PATH = 'http://3.230.233.42:9090/weedapiV1/';
  //private BASE_PATH = 'http://82.64.61.155:6666/weedapiV1/';
  private BASE_PATH = 'http://weeddeliveryback.palladium46.fr/weedapiV1/';

  constructor(private httpService: HttpClient) {
    let authToken = sessionStorage.getItem('Authorization');
    if (authToken) {
      this.headers = this.headers.set('Authorization', authToken);
    }
  }

  set AuthToken(token: string) {
    sessionStorage.setItem('Authorization', token);
    this.headers = this.headers.set('Authorization', token);
  }
  get<T>(url: string): Observable<T> {
    return this.httpService.get<T>(this.BASE_PATH + url, { headers: this.headers });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.httpService.post<T>(this.BASE_PATH + url, body, { headers: this.headers });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.httpService.put<T>(this.BASE_PATH + url, body, { headers: this.headers });
  }

  login(username: string, password: string): Observable<ResponseLoginDTO> {
    console.log(username + ' ' + password);
    return this.httpService
      .post<ResponseLoginDTO>(this.BASE_PATH + 'auth/signin', { username: username, password: password })
      .pipe(first());
  }

  recupererPass(email: string, username: string) {
    return this.httpService.post(
      this.BASE_PATH + 'auth/password-recovery',
      { email: email, userName: username },
      { headers: this.headers },
    );
  }
}
