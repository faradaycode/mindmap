import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { FungsiProvider } from '../../providers/fungsi/fungsi';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';


/**
 * Generated class for the next4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next4',
  templateUrl: 'next4.html',
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
export class Next4Page {

  datas: any = [];
  id_parent;
  kelas;
  animating = "";
  head_anim = "";
  parentName;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transit: NativePageTransitions,
    private serv: FungsiProvider) {
    this.id_parent = this.navParams.get("ID");
    this.parentName = this.navParams.get("parentName");
    // this.kelas = this.navParams.get("kls").toString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad next4Page');
  }

  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
      direction: 'down'
    };

    this.transit.slide(options);
  }

  ngOnInit() {
    this.animating = "anim-a";
    this.head_anim = "anim-b";

    this.serv.jsonCall("assets/subbab.json").subscribe(data => {
      for (let i in data) {
        if (data[i].parent_id === this.id_parent) {
          this.datas.push(data[i]);
        }
      }
    });
  }

  itemClk(hal) {
    if (hal !== null) {
      this.serv.callAlert(hal);
    } else {
      this.serv.callToast("NEXT");
    }
  }

  back() {
    this.navCtrl.pop();
  }
}
