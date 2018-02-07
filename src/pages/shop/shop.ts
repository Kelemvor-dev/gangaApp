import { ViewChild, Component, AfterViewInit } from '@angular/core';
import { ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { PerfilPage } from '../../pages/perfil/perfil';
import { NotificationsPage } from '../../pages/notifications/notifications';
import { InicioPage } from '../../pages/inicio/inicio';
import { ProductsPage } from '../../pages/products/products';
import { Storage } from '@ionic/storage';
import { KSSwiperModule, KSSwiperContainer } from 'angular2-swiper';
var options = new Array();
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage implements AfterViewInit {

  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;

  id: any;
  products: any;
  keysproducts: any;
  url: any;
  images: any;
  keyimages: any;
  user_id: any;
  notifications: any = "vacio";
  public count: any;
  public opciones: any;

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
    public slide: KSSwiperModule
  ) {
    this.id = navParams.get('id');
    this.getNumnotifications();
    this.getProductsbycategorie();
    this.getProductsimages();
  }

  ionViewDidLoad() {
    this.loader.present();
  }

  getProductsbycategorie() {
    let catId = { id: '' + this.id }
    this.userService.getProductsbycategorie(catId).then((result) => {
      this.products = result;
      this.keysproducts = Object.keys(result);
      this.url = this.userService.apiUrl;
    });
  }

  getProductsimages() {
    this.userService.getProductsimages().then((result) => {
      this.images = result;
      this.keyimages = Object.keys(result);
      this.url = this.userService.apiUrl;
      for (let key of this.keysproducts) {
        options[this.products[key].id] = {
          pagination: '.swiper-pagination-' + this.products[key].id,
          nextButton: '.swiper-button-next-' + this.products[key].id,
          prevButton: '.swiper-button-prev-' + this.products[key].id,
          spaceBetween: 30,
          freeMode: true,
        }
      }
      this.opciones = options;
    });
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

  moveNext() {
    this.swiperContainer.swiper.slideNext();
  }

  movePrev() {
    this.swiperContainer.swiper.slidePrev();
  }

  ngAfterViewInit() {
    this.swiperContainer;
  }

}
