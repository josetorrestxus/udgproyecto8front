import { Component, OnInit, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

//imports 
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonImg } from '@ionic/angular/standalone';
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonInput} from '@ionic/angular/standalone';
import { IonHeader, IonCol, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonSpinner, IonFooter} from '@ionic/angular/standalone';
import { IonRow, IonGrid, IonAlert, IonSegmentButton } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
//import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { peopleCircleOutline } from 'ionicons/icons';


//owns
import { BdServiceService } from '../shared';
import { IUser } from '../shared/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [
    IonImg, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonCol, IonButton, IonInput, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,
    IonSpinner, IonFooter, ReactiveFormsModule, IonRow, IonGrid, IonAlert, IonSegmentButton
  ],
})
export class UserPage implements OnInit {
  private bdservice = inject(BdServiceService);
  isWaiting:Boolean = false;
  users: Array<IUser> = [];
  activeUser: IUser = {
    name: '',
    email: '',
    _id: ''
  };


  public addUserButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: (alertData:any) => {
        this.addUser(alertData.name, alertData.email);
      },
    },
  ];

  public deleteUserButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {

        this.deleteUserProceed(this.activeUser);


      },
    },
  ];

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }


  public alertInputs = [
    {
      placeholder: 'Nombre',
      name: 'name',
      label: 'Nombre', 
      id: 'txtName' 
    },
    {
      placeholder: 'Email',
      name: 'email',
      label: 'Email', 
      id: 'txtEmail' 
    }
  ];


  constructor(private alertController: AlertController) {
    addIcons({ peopleCircleOutline });
   }

  ngOnInit() {
    this.loadData();
  }
  

  
  loadData(){
    this.isWaiting =true;
    this.bdservice.getUsers()
    .then(response => {
      this.isWaiting =false;
      console.log(response)
      if (response.hasOwnProperty("data") && response.results>0) {
          this.users = response.data.users;
      } else  {
        //todo: send message, there is no data found. 
      }
    })
    .catch(err => {
      this.isWaiting =false;
      console.log(err)
    })
  }

  deleteUser(user: IUser ) {

    //todo 
    if (user) {
      this.activeUser = user;
      this.presentAlert('Esta seguro de eliminar a : ' + user.email,'Eliminar usuario', '', this.deleteUserButtons);
    }
  }

  deleteUserProceed (user: IUser) {
    this.bdservice.deleteUser(user)
    .then ( response => {
        console.log(response)
          this.presentAlert('Se elimino el usaurio de la BD','Eliminación  de usuario');
          this.loadData();
    })
    
  }

  
  addUser(name:string, email:string){
    if (!name || !email) {
      this.presentAlert('Favor de capturar correctamente los campos','Alta de usuario', 'Error de datos');
    } else {
      email.toLowerCase();
      if (this.users.map((u)=>u.email).indexOf(email) > -1 ) {
        this.presentAlert('El correo ya existe en la lista de usuarios','Alta de usuario', 'Error de datos');
      } else {
        this.bdservice.postUser({name,email})
        .then( response=>{
          console.log(response);
          this.presentAlert('Se dio de alta al usuario con correo: ' + email,'Alta de usuario');
          this.loadData();
        })
        .catch(err => {
          console.log(err)
        });

      }
    }

  }

  
  async presentAlert(message: string = '', header:string = '', subHeader: string = '' , buttons: Array<any> = ['Ok']) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons,
    });

    await alert.present();
  }


  

}
