import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor() { }
  async registroAuth(p:string,u:string,m:string){
    try{
      const resultado = await firebase.auth().
      createUserWithEmailAndPassword(m,p);
      if(resultado.user){
        await resultado.user.updateProfile({
          displayName:u 
        });
        await resultado.user.sendEmailVerification();
      }
    }
  }catch(e){
    console.log('error inesperado');
  }
}
