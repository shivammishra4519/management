import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
userId:any;
role:any;

  decodingRole() {
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token
      const decodeToken: any = jwt_decode.jwtDecode(token) as { [key: string]: any };
      const role=decodeToken.role;
      this.role=role;
      this.userId=decodeToken.number;
      return role;
    } else {
      console.error('Token not found in localStorage');
    }
  }
}
