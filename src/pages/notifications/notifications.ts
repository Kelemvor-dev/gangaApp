import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})

export class NotificationsPage {
  user_id: any;
  notifications: any;
  keysNotify: any;

  public loader = this.loadingCtrl.create({
    content: "",
    spinner: 'dots',
    duration: 3000
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userService: UserServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.getlistNumnotifications();
  }

  ionViewDidLoad() {
    this.loader.present();
  }

  getlistNumnotifications() {
    this.storage.get('user_id').then((user_id_f) => {
      this.user_id = user_id_f;
      let usuario = { user_id: '' + this.user_id }
      this.userService.getlistNumnotifications(usuario).then((result) => {
        this.notifications = result;
        this.keysNotify = Object.keys(result);
      }, (err) => {
        console.log(err);
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
