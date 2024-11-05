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
  materia: string = '';
  ciclo: string = '';

  alumnoCalificacionesHeaders:Array<ITableData> = Fields_Calificaciones;
  alumnoCalificaciones: Array<object> = [];
  isWaiting:Boolean= false;

  
  validations = {
    ciclo: [
      {type: "required", message: "Favor de introducir ciclo"}
    ],
    materia: [
      {type: "required", message: "Favor de introducir materia"}
    ] 
  }

  fg: any = undefined;
  fge: any = undefined;


  constructor(public fb: FormBuilder, private alertController: AlertController) {
    
   }
    
  ngOnInit() {
    this.fg = this.fb.group(
      {
        ciclo: new FormControl('', Validators.compose([ Validators.required  ])) ,
        materia: new FormControl('', Validators.compose([ Validators.required  ])) 
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

        this.calificar(this.ciclo, this.materia, alertData.codigo, alertData.calificacion);
      },
    },
  ];


  submitStudent(values:any){
    this.ciclo = values.ciclo
    this.materia = values.materia
    this.presentAlert('Favor de capturar los datos', `Calificar materia de ${values.materia}` , '' , this.addCalificacionButtons, this.alertInputs)
  }

  calificar(ciclo: string, materia:string, codigo:string, calificacion:string) {
    if (codigo && calificacion) {
      this.bdservice.addGrade(ciclo, materia, codigo, calificacion)
      .then( (response:any) =>{
        this.alumnoCalificaciones.push (
          {
            ciclo, materia, codigo, calificacion
          }
        )
      })
      .catch( (err:any)=>{
        this.presentAlert ('Error al registrar la calificación', 'Error')
      })

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


