import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase';
//npm install firebase@8.10.1
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

// para guardar el usuario
  private url = 'http://localhost:3000/api';
  private usuarioActual = new BehaviorSubject<any>(null);

  // isLoggedIn:boolean = false;
  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<any>{
    return this.http.post(`${this.url}/login`, { correo, contrasena });
  }

  guardarSesion(usuario: any){
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuarioActual.next(usuario);
  }

  obtenerUsuario(){
    return JSON.parse(localStorage.getItem("usuario") || "null");
  }

  estaLogueado(): boolean{
    return localStorage.getItem("usuario") !== null;
  }

  logout(){
    localStorage.removeItem("usuario");
    this.usuarioActual.next(null);
  }

//   async login (u:string, p:string){
//     if(u == '' || p == '' ){
//       return false;
//     }
 
//  if(await !this.uChecker(u) || await !this.pChecker(p)){
// return false;
//  }
 
// /////authFirebase
//  return await this.authFirebase(u,p);
// }
  /////aqui acaba el login fun ---> JAJAJAJA nada nada
//   async uChecker(u:string){
//     //'/[a-zA-Z0-9]+@+[a-zA-Z0-9_-]+[a-zA-Z]{2,}/'
//     return /[a-zA-Z0-9_-@.]/.test(u);
//     return true;
//   }
//   async pChecker(p:string){
//     if(p.length < 8 || !/[A-Za-z0-9-=!-_]/.test(p)){
//     return false;
//     }
//     return true;
//   }
//   async authFirebase(u:string,p:string){
//     try{
// const resultado = await firebase .auth().
// signInWithEmailAndPassword(u,p);
// if(resultado.user && resultado.user.uid){
// this.setLogginState(u,resultado.user.uid);
// this.setLoggin();
// return true;
// }
// return false;
//     }catch(e){
//       console.log(e);
//       return false;
//     }
//     return true;
//   }
//   setLogginState(u:string, uid:any){
//     localStorage.setItem('uid',JSON.stringify(uid));
//     localStorage.setItem('user',JSON.stringify(u));
//     localStorage.setItem('level',JSON.stringify('1'));
//   }
 
// setLoggin(){
//   this.isLoggedIn = !this.isLoggedIn;
// }
 
}