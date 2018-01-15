import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { PerfilPage } from "../perfil/perfil";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  public user_id: any = "";
  public val: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {    
    this.storage.get('user_id').then((val) => {
      this.user_id = val;
    });
    if (this.user_id != null) {
      setTimeout(() => {
        this.navCtrl.push(HomePage);
      }, 3000);
    } else {
      setTimeout(() => {
        this.navCtrl.push(PerfilPage);
      }, 3000);
    }
  }

}
