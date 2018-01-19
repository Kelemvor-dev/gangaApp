import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { GoogleMaps } from '@ionic-native/google-maps';//Provider de google maps
import { MyApp } from './app.component';
//PAGES
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { RegisterPage } from '../pages/register/register';
import { LoadingPage } from '../pages/loading/loading';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ContactsPage } from '../pages/contacts/contacts';
import { InformationPage } from '../pages/information/information';
//PROVIDERS
import { UserServiceProvider } from '../providers/user-service/user-service';
import { IonicStorageModule } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Camera } from '@ionic-native/camera';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    LoadingPage,
    RegisterPage,
    ResetPasswordPage,
    ContactsPage,
    InformationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerfilPage,
    LoadingPage,
    RegisterPage,
    ResetPasswordPage,
    ContactsPage,
    InformationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserServiceProvider,
    ScreenOrientation,
    Network,
    Camera,
    GoogleMaps
  ]
})
export class AppModule { }
