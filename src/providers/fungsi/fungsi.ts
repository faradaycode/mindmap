import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the FungsiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FungsiProvider {

  public opt_slide: NativeTransitionOptions = {
    direction: 'up',
    // duration: 500,
    // slowdownfactor: 3,
    // slidePixels: 20,
    // iosdelay: 100,
    // androiddelay: 150,
    // fixedPixelsTop: 0,
    // fixedPixelsBottom: 60
  };
  
  constructor(public http: HttpClient, private tos: ToastController) {
    console.log('Hello FungsiProvider Provider');
  }

  //get json
  jsonCall(jsonfile) {
    return this.http.get(jsonfile);
  }

  //toast
  callToast(messages) {
    let toa = this.tos.create({
      message: messages,
      duration: 4000,
      position: 'top'
    });

    toa.present();
  }
  

}
