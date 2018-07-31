import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { FungsiProvider } from '../../providers/fungsi/fungsi';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('flyInOut', [
      transition('* => anim-a', [
        query('div', style({ opacity: 0 }), { optional: true }),
        query('div', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, -100px, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ]),
      
      transition('* => anim-b', [
        query('.row', style({ opacity: 0 }), { optional: true }),
        query('.row', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, 100px, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})
export class HomePage {
  datas: any = [];
  imgL = "assets/imgs/";
  fallen1 = "";
  fallen2 = "";
  goaway = "";
  setID;

  constructor(public navCtrl: NavController, private serv: FungsiProvider, private modals: ModalController,
  private transit: NativePageTransitions) {

  }

  ionViewDidLeave(){
    let a1 = document.getElementById("conUp");
    let a2 = document.getElementById("conKls");

    a1.classList.remove("slideup");
    a2.classList.remove("showup");
  }

  openKls(id) {
    let a1 = document.getElementById("conUp");
    let a2 = document.getElementById("conKls");
    
    a1.classList.add("slideup");
    a2.classList.add("showup");

    this.setID = id;
  }

  goto(kelas) {
    let options: NativeTransitionOptions = {
      direction: 'up'
    };
    
    this.transit.flip(options);
    this.navCtrl.push("Next2Page",{
      ID: this.setID,
      kls: kelas
    });
  }

  ngOnInit() {
    this.fallen1 = "anim-a";
    this.fallen2 = "anim-b";

    this.serv.jsonCall("assets/mapel.json").subscribe(data => {
      this.datas = data;
    });
  }
  
}
