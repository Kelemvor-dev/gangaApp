import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform, ToastController, NavParams, ViewController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { PerfilPage } from "../perfil/perfil";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { ContactsPage } from '../contacts/contacts';
import { InformationPage } from '../information/information';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any[] = [];
  public data: any[] = [];
  public msg: any = "";
  public user_id: any = "";

  home = {};

  public loader = this.loadingCtrl.create({
    content: "",
    spinner: 'dots',
    dismissOnPageChange: true
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserServiceProvider,
    private alertCtrl: AlertController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private network: Network,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController
  ) { }

  displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type;
    this.toastCtrl.create({
      message: `You are now ${connectionState} via ${networkType}`,
      duration: 3000
    }).present();
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock('portrait');
    }
  }

  login() {
    this.loader.present();
    this.userService.restLogin(this.home).then((result) => {
      if (result) {
        if (result["status"]) {
          this.storage.clear();
          this.storage.set('user_id', result["data"]['user_id']);
          this.storage.set('username', result["data"]['username']);
          this.storage.set('first_name', result["data"]['first_name']);
          this.storage.set('last_name', result["data"]['last_name']);
          this.storage.set('mobile', result["data"]['mobile']);
          this.storage.set('email', result["data"]['email']);
          this.storage.set('documento_de_identidad', result["data"]['documento_de_identidad']);
          this.storage.set('phone', result["data"]['phone']);
          this.navCtrl.push(PerfilPage);
        } else {
          let alert = this.alertCtrl.create({
            title: '!Upss¡',
            subTitle: result["message"],
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
    this.navCtrl.setRoot(RegisterPage);
  }
  reset_pass() {
    this.navCtrl.setRoot(ResetPasswordPage);
  }
  contact() {
    this.navCtrl.setRoot(ContactsPage);
  }
  information() {
    this.navCtrl.setRoot(InformationPage);
  }
}
