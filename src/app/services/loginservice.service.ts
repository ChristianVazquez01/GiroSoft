import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase';
//npm install firebase@8.10.1
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  isLoggedIn:boolean = false;
  constructor() { }
  async login (u:string, p:string){
    if(u == '' || p == '' ){
      return false;
    }
 
 if(await !this.uChecker(u) || await !this.pChecker(p)){
return false;
 }
 
/////authFirebase
 return await this.authFirebase(u,p);
}
  /////aqui acaba el login fun
  async uChecker(u:string){
    //'/[a-zA-Z0-9]+@+[a-zA-Z0-9_-]+[a-zA-Z]{2,}/'
    return /[a-zA-Z0-9_-@.]/.test(u);
    return true;
  }
  async pChecker(p:string){
    if(p.length < 8 || !/[A-Za-z0-9-=!-_]/.test(p)){
    return false;
    }
    return true;
  }
  async authFirebase(u:string,p:string){
    try{
const resultado = await firebase .auth().
signInWithEmailAndPassword(u,p);
if(resultado.user && resultado.user.uid){
this.setLogginState(u,resultado.user.uid);
this.setLoggin();
return true;
}
//no puede acceder
return false;
    }catch(e){
      console.log(e);
      return false;
    }
    return true;
  }
  setLogginState(u:string, uid:any){
    localStorage.setItem('uid',JSON.stringify(uid));
    localStorage.setItem('user',JSON.stringify(u));
    localStorage.setItem('level',JSON.stringify('1'));
  }
 
setLoggin(){
  this.isLoggedIn = !this.isLoggedIn;
}
 
}