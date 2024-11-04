import { Component, OnInit, inject } from '@angular/core';
import { InfiniteScrollCustomEvent, SegmentChangeEventDetail } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlOptions } from '@angular/forms'
import { AlertController } from '@ionic/angular';

//own 
import { BdServiceService } from '../shared';
import { IObjectMap, IData, ITableData , IStudentRegister} from '../shared/interfaces';
import { StudentFields, Fields_Calificaciones } from '../shared/constants';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonImg } from '@ionic/angular/standalone';
import { IonHeader} from '@ionic/angular/standalone';

//imports 
import { ReactiveFormsModule } from '@angular/forms';
import { IonToolbar, IonButtons, IonMenuButton, IonTitle, IonInput} from '@ionic/angular/standalone';
import { IonCol, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonSpinner, IonFooter} from '@ionic/angular/standalone';
import { IonRow, IonGrid, IonInfiniteScroll, IonSegmentButton, IonSearchbar, IonSegment, IonInfiniteScrollContent  } from '@ionic/angular/standalone';



@Component({
  selector: 'app-studentitem',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
  standalone: true,
  imports: [
    IonImg, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonCol, IonButton, IonInput, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,
    IonSpinner, IonFooter, ReactiveFormsModule, IonRow, IonGrid, IonLabel, IonRow, IonInfiniteScroll, IonSegmentButton, IonSearchbar, IonSegment, IonInfiniteScrollContent
  ]
})
export class GradesItemPage implements OnInit {
  
  private bdservice = inject(BdServiceService)
  private activatedRoute = inject(ActivatedRoute);
  

  section: string = "student";
  id: string = "";
  stName: string = "detalle";
  data: object =  {};
  codigo: string = '';
  itemsStudent: Array<IObjectMap>  = [];
  newItem: IStudentRegister = {};

  alumnoCalificacionesHeaders:Array<ITableData> = Fields_Calificaciones;
  alumnoCalificaciones: Array<object> = [];
  isWaiting:Boolean= false;

  
  validations = {
    materia: [
      {type: "required", message: "Favor de introducir codigo"}
    ]
  }

  fg: any = undefined;
  fge: any = undefined;


  constructor(public fb: FormBuilder, private alertController: AlertController) {
    
   }
    
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (this.id) {
      this.loadData(this.id);
    }
    

    this.fg = this.fb.group(
      {
        materia: new FormControl('', Validators.compose([ Validators.required  ])) ,
      }
    )


  }


  
  public alertInputs = [
    {
      placeholder: 'Código de alumno',
      name: 'codigo',
      label: 'Código:', 
      id: 'codigo' 
    },
    {
      placeholder: 'Calificación',
      name: 'calificacion',
      label: 'Calificación:', 
      id: 'calificacion' 
    }
  ];

  public addCalificacionButtons = [
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

        this.calificar(alertData.codigo, alertData.calificacion);
      },
    },
  ];


  submitStudent(values:any){
    this.presentAlert('Favor de capturar los datos', `Calificar materia de ${values.materia}` , '' , this.addCalificacionButtons, this.alertInputs)
  }

  calificar(codigo:string, calificacion:string) {
    if (codigo && calificacion) {
      

    } else {
      this.presentAlert ('Código y calificación son requeridos', 'Error')
    }
  }

  
  async presentAlert(message: string = '', header:string = '', subHeader: string = '' , buttons: Array<any> = ['Ok'], inputs: Array<any>=[]) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons,
      inputs
    });

    await alert.present();
  }


  
  submitStudentback(values:any){

    /*
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
 */
  }
 
  

  loadData(id: string){
    if (id) {

      
      /*
      this.bdservice.getStudentByCode(id)
      .then(response => {
        console.log(response);
        if (response.hasOwnProperty("data") ) {
          this.data = response.data;
          this.codigo = this.data["codigo" as keyof typeof this.data];
          this.stName = `${this.codigo} - ${this.data["nombre" as keyof typeof this.data]}`;
          if (response.data.calificaciones){
            this.calificaciones = this.data["calificaciones" as keyof typeof this.data];
          }
          this.itemsStudent = this.chargeData(StudentFields, this.data);

        }
      })
        */
      
      
      
    }
  }

  
  setFieldName (key : string, ev: any) {
    console.log(ev.detail.value);
    switch (key) {
      case 'codigo': {      
        this.newItem ['codigo'] = ev.detail.value + '';
        break;
      } 
      case 'correo': {
        this.newItem ['correo'] = ev.detail.value + '';
        break;
      }  
      case 'nombre': {
        this.newItem ['nombre'] = ev.detail.value + '';
        break;
      } 
      case 'correoInstitucional': {
      this.newItem ['correoInstitucional'] = ev.detail.value + '';
        break;
      } 
      case 'imageUrl': {
      this.newItem ['imageUrl'] = ev.detail.value + '';
        break;
      } 
      case 'admision': {
      this.newItem ['admision'] = ev.detail.value + '';
        break;
      } 
      case 'estatus': {
      this.newItem ['estatus'] = ev.detail.value + '';
        break;
      } 
      case 'nivel': {
      this.newItem ['nivel'] = ev.detail.value + '';
        break;
      }  
      case 'situacion': {
      this.newItem ['situacion'] = ev.detail.value + '';
        break;
      } 
      case 'ciclos': {
      this.newItem ['ciclos'] = ev.detail.value + 0;
        break;
      } 
      case 'ultimoCiclo': {
      this.newItem ['ultimoCiclo'] = ev.detail.value + '';
        break;
      } 
      case 'carrera': {
      this.newItem ['carrera'] = ev.detail.value + '';
        break;
      } 
      case 'sede': {
      this.newItem ['sede'] = ev.detail.value + '';
        break;
      } 
      case 'creditos': {
      this.newItem ['creditos'] = ev.detail.value + 0;
        break;
      } 
      case 'promedio': {
      this.newItem ['promedio'] = ev.detail.value + 0;
        break;
      } 
    }
  } 

  registrar () {
    //save 
  }

  getV(itm:any, fld:ITableData){
    return itm[fld.field as keyof typeof this.data]    
  }

  chargeData(arrFields: Array<IData>, data: any): Array<IObjectMap> {
    console.log(data);
    let arrItems: Array<IObjectMap>  = [];
    for (let i:number=0; i<arrFields.length;i++) {
      console.log(arrFields[i].field, data[arrFields[i].field]);
      let value: string = `${data[arrFields[i].field]}`;
      let item: IObjectMap = {
        "key": arrFields[i].title,
        "value": value || ''
      }
      arrItems.push(item);
    }
    return arrItems;
  }

  onSegmentChange (ev: CustomEvent<SegmentChangeEventDetail>){
    this.section = ev.detail.value?.toString() || 'student';
  }

}


