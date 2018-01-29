import { ViewChild, Component } from '@angular/core';
import { NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';


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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public userService: UserServiceProvider,
  ) {
    this.getBanners();
    this.getPublications();

  }

  ionViewDidLoad() {

  }

  getPublications() {
    this.userService.getPublicacions().then((data) => {
      if (data) {
        console.log(data);
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

}
