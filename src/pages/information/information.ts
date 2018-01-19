
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";

declare var google;

@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {

  @ViewChild('map')
  mapElement: ElementRef;
  map: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    
    let latLng = new google.maps.LatLng(4.651204, -74.091766);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
   
    let content = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>";         
   
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }

  cancel() {
    this.navCtrl.setRoot(HomePage);
  }

}
