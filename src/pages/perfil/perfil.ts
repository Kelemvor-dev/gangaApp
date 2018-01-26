import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InicioPage } from '../../pages/inicio/inicio';
import { LoadingPage } from '../../pages/loading/loading';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  user = {};
  user_id: any;
  username: any;
  first_name: any;
  last_name: any;
  mobile: any;
  email: any;
  documento_de_identidad: any;
  phone: any;
  imagen: any;
  notifications: any ="vacio";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public userService: UserServiceProvider,
    public loadingCtrl: LoadingController,
  ) {
  }
  public loader = this.loadingCtrl.create({
    content: "",
    spinner: 'dots',
    dismissOnPageChange: true
  });

  ionViewDidLoad() {    
    this.storage.get('user_id').then((user_id_f) => {
      this.user_id = user_id_f;
      let usuario = { user_id: '' + this.user_id }
      this.userService.countNotifications(usuario).then((result) => {
        console.log(result);
        this.notifications = result;
      }, (err) => {
        console.log(err);
      });
    });
    this.storage.get('username').then((username_f) => {
      this.username = username_f;
    });
    this.storage.get('first_name').then((first_name_f) => {
      this.first_name = first_name_f;
    });
    this.storage.get('last_name').then((last_name_f) => {
      this.last_name = last_name_f;
    });
    this.storage.get('mobile').then((mobile_f) => {
      this.mobile = mobile_f;
    });
    this.storage.get('email').then((email_f) => {
      this.email = email_f;
    });
    this.storage.get('documento_de_identidad').then((documento_de_identidad) => {
      this.documento_de_identidad = documento_de_identidad;
    });
    this.storage.get('phone').then((phone) => {
      this.phone = phone;
    });
    this.storage.get('imagen').then((imagen) => {
      this.imagen = this.userService.apiUrl + "files/thumb/" + imagen;
    });

  }

  home(){
    this.navCtrl.setRoot(InicioPage);
  }

  logout(){
    this.storage.clear();
    this.navCtrl.setRoot(LoadingPage);
  }

}
