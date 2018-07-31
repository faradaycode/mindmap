import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { FungsiProvider } from '../../providers/fungsi/fungsi';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';


/**
 * Generated class for the Next2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next2',
  templateUrl: 'next2.html',
  animations: [
    trigger('flyInOut', [
      transition('* => anim-a', [

        query('.left', style({ opacity: 0 }), { optional: true }),
        query('.left', stagger('500ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(100px, 0, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query('.right', style({ opacity: 0 }), { optional: true }),
        query('.right', stagger('500ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(-100px, 0, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ]),
      transition('* => anim-b', [
        query('.timeline-header', style({ opacity: 0 }), { optional: true }),
        query('.timeline-header', stagger('500ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, -100px, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})
export class Next2Page {

  datas: any = [];
  id_parent;
  kelas;
  animating = "";
  head_anim = "";
  _MAX: number;
  _MAPEL;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transit: NativePageTransitions,
    private serv: FungsiProvider) {
    this.id_parent = this.navParams.get("ID");
    this.kelas = this.navParams.get("kls").toString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Next2Page');
  }

  ngOnInit() {
    this.animating = "anim-a";
    this.head_anim = "anim-b";

    this.serv.jsonCall("assets/bab.json").subscribe(data => {
      for (let i in data) {
        if (data[i].id_m === this.id_parent) {
          if (data[i].kls === this.kelas) {
            this.datas.push(data[i]);
            this._MAX = this.datas.length;
          }
        }
      }
    });
  }

  itemClk(id, name: String = null) {
    let options: NativeTransitionOptions = {
      direction: 'left'
    };

    this.transit.slide(options);

    this.navCtrl.push("Next3Page", {
      ID: id,
      NAME: name
    });
  }

  back() {
    this.navCtrl.pop();
  }
}
