import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from "../home/home";


@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  email: AbstractControl;  

  resetPassForm: FormGroup;

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
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
  ) {
    this.resetPassForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],        
  });
  }

  ionViewDidLoad() {

  }

  onSubmit(value: any): void {    
    this.loader.present();
    this.userService.restResetpass(value).then((result) => {
      console.log(result);
      if (result) {
        let resiterAlert = this.alertCtrl.create({          
          subTitle: result['msg'],
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

  cancel() {
    this.navCtrl.setRoot(HomePage);
  }

}
