import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  decodingRole() {
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token
      const decodeToken: any = jwt_decode.jwtDecode(token) as { [key: string]: any };
      const role=decodeToken.role;
      return role;
    } else {
      console.error('Token not found in localStorage');
    }
  }
}
