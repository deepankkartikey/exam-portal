import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // generate token
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`, loginData)
  }

  // login user: set token in local storage
  public loginUser(token: string){
    localStorage.setItem("token", token)
    return true;
  }

  // is logged in: check if user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token")
    if(tokenStr == undefined || tokenStr ==  '' || tokenStr == null){
      return false;
    }
    return true;
  }

  // logout: remove token from local storage
  public logout(){
    localStorage.removeItem("token")
    return true;
  }

  // getToken: returns token from local storage
  public getToken(){
    return localStorage.getItem("token")
  }

  // set user details into local storage as well
  public setUserDetails(user: any){
    localStorage.setItem("user", JSON.stringify(user))
  }

  // getUser from the local storage
  public getUser(){
    let userStr = localStorage.getItem("user")
    if(userStr != null){
      return JSON.parse(userStr);
    }
    else{
      this.logout;
      return null;
    }
  }

  // get user role: the first role/ single role to be precise
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
