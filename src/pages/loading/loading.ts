import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PerfilPage } from "../perfil/perfil";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  public val: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {   
    this.storage.clear();
    this.storage.get('user_id').then((val) => {
      if (val == null) {
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage);
        }, 3000);
      } else {
        setTimeout(() => {
          this.navCtrl.setRoot(PerfilPage);
        }, 3000);
      }
    });
  }

}
