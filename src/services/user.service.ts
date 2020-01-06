import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

const API_URL = 'https://yalantis-react-school.herokuapp.com/api/task0/users';

@Injectable()
export class UserService {
  constructor(protected http: HttpClient) {}

  public getUsers(): Observable<HttpResponse<any>> {
    return this.http.get(API_URL,
      {headers:
          {'Content-Type': 'application/json'},
        observe: 'response'
      });
  }
}
