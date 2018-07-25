import { FungsiProvider } from './../../providers/fungsi/fungsi';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModklsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modkls',
  templateUrl: 'modkls.html',
})
export class ModklsPage {

  setID;

  constructor(public navCtrl: NavController, public navParams: NavParams, private views: ViewController,
  private transit: NativePageTransitions, private serv: FungsiProvider) {
    this.setID = navParams.get("ID");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModklsPage');
  }

  dismiss() {
    this.views.dismiss();
  }

  goto(kelas) {
    this.transit.slide(this.serv.opt_slide);
    this.navCtrl.push("Next2Page",{
      ID: this.setID,
      kls: kelas
    }).then(()=>{
      this.views.dismiss();
    });
  }

}
