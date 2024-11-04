import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  static isLoggedIn : boolean = false;
  static isAdmin: boolean = false;
  constructor() { }


 public setIsLoggedIn(value: boolean) {
  AuthserviceService.isLoggedIn = value;
 } 
 public getIsLoggedIn() {
  return AuthserviceService.isLoggedIn ;
 } 

 public setIsAdmin(value: boolean) {
  AuthserviceService.isAdmin = value;
 } 
 public getIsAdmin() {
  return AuthserviceService.isAdmin ;
 } 


}
