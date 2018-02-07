import { ViewChild, Component } from '@angular/core';
import { ModalController, NavController, NavParams, MenuController, Slides, LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
//PAGES
import { PerfilPage } from '../../pages/perfil/perfil';
import { NotificationsPage } from '../../pages/notifications/notifications';
import { ProductsPage } from '../../pages/products/products';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})

export class InicioPage {
  @ViewChild(Slides) slides: Slides;
  banner: any;
  publications: any;
  keys: string[];
  keysPublications: string[];
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
    public menuCtrl: MenuController,
    public userService: UserServiceProvider,
    private storage: Storage,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) {
    this.getBanners();
    this.getPublications();
    this.getNumnotifications();

  }

  ionViewDidLoad() {
    this.loader.present();
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

  getPublications() {
    this.userService.getPublicacions().then((data) => {
      if (data) {
        this.publications = data;
        this.keysPublications = Object.keys(data);
        this.url = this.userService.apiUrl;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getBanners() {
    this.userService.bannerHome().then((data) => {
      if (data) {
        this.banner = data;
        this.keys = Object.keys(data);
        this.url = this.userService.apiUrl;
      }
    }, (err) => {
      console.log(err);
    });
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex == 3) {
      this.slides.stopAutoplay();
    }
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
