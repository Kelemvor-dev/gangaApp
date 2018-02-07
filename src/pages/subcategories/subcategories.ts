import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { PerfilPage } from '../../pages/perfil/perfil';
import { NotificationsPage } from '../../pages/notifications/notifications';
import { InicioPage } from '../../pages/inicio/inicio';
import { ProductsPage } from '../../pages/products/products';
import { ShopPage } from '../../pages/shop/shop';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-subcategories',
  templateUrl: 'subcategories.html',
})
export class SubcategoriesPage {

  id: any;
  categories: any;
  keysCategories: any;
  url: any;
  user_id: any;
  notifications: any = "vacio";

  public loader = this.loadingCtrl.create({
    content: "",
    spinner: 'dots',
    duration: 3000
  });
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserServiceProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private storage: Storage,
  ) {
    this.id = navParams.get('id');
    this.getCategories();
    this.getNumnotifications();
  }

  ionViewDidLoad() {
    this.loader.present();
  }

  getCategories() {
    let catId = { id: '' + this.id }
    this.userService.getCategories(catId).then((result) => {
      this.categories = result;
      this.keysCategories = Object.keys(result);
      this.url = this.userService.apiUrl;
    });
  }
  getProductsApp(id){
    this.navCtrl.setRoot(ShopPage, { 'id': id });
  }

  getNumnotifications() {
    this.storage.get('user_id').then((user_id_f) => {
      this.user_id = user_id_f;
      let usuario = { user_id: '' + this.user_id }
      this.userService.countNotifications(usuario).then((result) => {
        this.notifications = result;
      }, (err) => {
        console.log(err);
      });
    });
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(NotificationsPage);
    profileModal.present();
  }

  profilePage() {
    this.navCtrl.setRoot(PerfilPage);
  }

  homePage() {
    this.navCtrl.setRoot(InicioPage);
  }

  productsPage() {
    this.navCtrl.setRoot(ProductsPage);
  }
}
