import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { PerfilPage } from "../perfil/perfil";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any[] = [];
  public data: any[] = [];
  public msg: any = "";
  public user_id: any = "";
 
  home: Array<Object> = [];
  reg: Array<Object> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserServiceProvider,
    private alertCtrl: AlertController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
  ) { }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  ionViewDidLoad() {

  }

  login() {
    this.userService.restLogin(this.home).then((result) => {
      if (result) {
        if (result.status) {
          this.storage.clear();
          this.storage.set('user_id', result.data['user_id']);
          this.storage.set('username', result.data['username']);
          this.storage.set('first_name', result.data['first_name']);
          this.storage.set('last_name', result.data['last_name']);
          this.storage.set('mobile', result.data['mobile']);
          this.storage.set('email', result.data['email']);
          this.storage.set('documento_de_identidad', result.data['documento_de_identidad']);
          this.storage.set('phone', result.data['phone']);
          this.navCtrl.push(PerfilPage);
        } else {
          let alert = this.alertCtrl.create({
            title: '!Upss¡',
            subTitle: result.message,
            buttons: ['Cerrar'],
            cssClass: 'alert-danger'
          });
          alert.present();
        }

      }
    }, (err) => {
      console.log(err);
    });
  }

  register() {
    this.userService.restRegister(this.reg).then((result) => {
      if (result) {
        let resiterAlert = this.alertCtrl.create({
          title: 'Su registro fue exitoso',
          subTitle: 'Ahora puedes ingresar en nuestra aplicacion',
          buttons: ['Cerrar'],
          cssClass: 'alert-success'
        });
        resiterAlert.present();
        this.navCtrl.push(HomePage);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
