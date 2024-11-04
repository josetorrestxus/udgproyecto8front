import { Component, Input, OnInit, inject } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlOptions } from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

//imports 
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonImg } from '@ionic/angular/standalone';
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonInput} from '@ionic/angular/standalone';
import { IonHeader, IonCol, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonSpinner, IonFooter} from '@ionic/angular/standalone';
import { IonRow, IonGrid } from '@ionic/angular/standalone';


//own
import { BdServiceService, AuthserviceService } from '../shared';
import { IUser } from '../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonImg, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonCol, IonButton, IonInput, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,
    IonSpinner, IonFooter, ReactiveFormsModule, IonRow, IonGrid
  ],
})
export class LoginPage implements OnInit {
  login: boolean = true;
  bdService = inject(BdServiceService);
  auth = inject(AuthserviceService);
  isWaiting:Boolean= false;

  validations = {
    username: [
      {type: "required", message: "Favor de introducir usuario o email"}
    ],
    password: [
      {type: "minlength", message: "El password debe ser al menos de 8 caracteres."}
    ]

  }

  fg: any = undefined;
  fge: any = undefined;


  constructor( 
    public menuCtrl: MenuController,
    public fb: FormBuilder,
    private route: Router,
    private alertController: AlertController
  ) {
    
   }

  
  ngOnInit(): void {
    this.auth.setIsLoggedIn(false);
    this.fg = this.fb.group(
      {username: new FormControl('', Validators.compose([
        Validators.required
      ])) ,
      password: new FormControl('', Validators.compose([
        Validators.minLength(4)
      ])) }
    )
  }
  
  ionViewWillEnter() {
  this.menuCtrl.enable(false);
 }

 submit(values:any){
  console.log(values);
  let user:IUser  = {
    email: values.username,
    password: btoa(values.password)
  };
  this.isWaiting=true;
  this.bdService.login(user)
  .then(response=>{
    this.isWaiting=false;
    // console.log(response);
    let txt:string = atob(response.data);
    // console.log(txt);
    let usr: IUser = JSON.parse(txt)._doc;
    // console.log(usr);
    if (usr.email) {
      //exists
      if (usr.tmpid) {
        // is new user
        this.startEditUser(usr.email);
      } else {
        //login succeedd
        console.log('entro ok login');
        this.auth.setIsLoggedIn(true);
        this.auth.setIsAdmin(!!usr.admin);
        this.route.navigate(['/', 'estudiantes']);
      }

    } else {
      this.presentAlert('Usuario o password no reconocidos.');
    }
  })
  .catch(err=>{
    this.isWaiting=false;
    this.presentAlert('Usuario o password no reconocidos');
  });

 }


 startEditUser(email:string){
  this.login = false;
  
  this.fge = this.fb.group({
    username: new FormControl('', Validators.compose([
      Validators.required
    ])) ,
    email: new FormControl({value: email, disabled: true}, Validators.compose([
      Validators.required
    ]), ) ,
    name: new FormControl('', Validators.compose([
      Validators.required
    ])) ,
    password: new FormControl('', Validators.compose([
      Validators.minLength(8)
    ])),
    password2: new FormControl('', Validators.compose([
      Validators.minLength(8)
    ]))  
  });

 }

 submitUsr(values:any){
  console.log(values);
  let user:IUser  = {
    email: this.fge.get('email').value,
    password: btoa(values.password),
    name: values.name,
    username: values.username
  };
  console.log(user);
  this.bdService.saveuser(user)
  .then(response=>{
    let txt:string = atob(response.data);
    let usr: IUser = JSON.parse(txt);
    this.login = true;
  });
 }



 async presentAlert(message: string = '', header:string = 'Login', subHeader: string = '' , buttons: Array<any> = ['Ok']) {
  const alert = await this.alertController.create({
    header,
    subHeader,
    message,
    buttons,
  });

  await alert.present();
}







}




