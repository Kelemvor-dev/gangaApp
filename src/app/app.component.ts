import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingPage } from '../pages/loading/loading';
import { PerfilPage } from '../pages/perfil/perfil';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../providers/user-service/user-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoadingPage;
  pages: Array<{ title: string, component: any, icon: string }>;

  first_name: any;
  last_name: any;
  imagen: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public userService: UserServiceProvider,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Categorias', component: PerfilPage, icon: 'fa fa-clone' },
      { title: 'Mis publicaciones', component: PerfilPage, icon: 'fa fa-list' },
      { title: 'Preguntas Frecuentes', component: PerfilPage, icon: 'fa fa-question-circle-o' },
      { title: 'Contactenos', component: PerfilPage, icon: 'fa fa-users' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('first_name').then((first_name_f) => {
      this.first_name = first_name_f;
    });
    this.storage.get('last_name').then((last_name_f) => {
      this.last_name = last_name_f;
    });
    this.storage.get('imagen').then((imagen) => {
      if (imagen) {
        this.imagen = this.userService.apiUrl + "files/thumb/" + imagen;
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.clear();
    this.nav.setRoot(LoadingPage);
  }

}

