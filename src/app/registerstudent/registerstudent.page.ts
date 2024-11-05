import { Component, OnInit, inject } from '@angular/core';
import { InfiniteScrollCustomEvent, SegmentChangeEventDetail } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlOptions } from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

//own 
import { BdServiceService } from '../shared';
import { IObjectMap, IData, ITableData , IStudentRegister} from '../shared/interfaces';
import { StudentFields, StudentFields_Calificaciones } from '../shared/constants';

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
  templateUrl: './registerstudent.page.html',
  styleUrls: ['./registerstudent.page.scss'],
  standalone: true,
  imports: [
    IonImg, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonCol, IonButton, IonInput, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,
    IonSpinner, IonFooter, ReactiveFormsModule, IonRow, IonGrid, IonLabel, IonRow, IonInfiniteScroll, IonSegmentButton, IonSearchbar, IonSegment, IonInfiniteScrollContent
  ]
})
export class RegisterstudentItemPage implements OnInit {
  
  private bdservice = inject(BdServiceService)
  private activatedRoute = inject(ActivatedRoute);
  

  section: string = "student";
  id: string = "";
  stName: string = "detalle";
  data: object =  {};
  codigo: string = '';
  itemsStudent: Array<IObjectMap>  = [];
  newItem: IStudentRegister = {};

  calificacionesHeaders:Array<ITableData> = StudentFields_Calificaciones;
  calificaciones: Array<object> = [];
  isWaiting:Boolean= false;

  
  validations = {
    codigo: [
      {type: "required", message: "Favor de introducir codigo"}
    ],
    correo: [
      {type: "required", message: "Favor de introducir correo"}
    ],
    nombre: [
      {type: "required", message: "Favor de introducir nombre"}
    ],
    admision: [
      {type: "required", message: "Favor de introducir admision"}
    ],
    estatus: [
      {type: "required", message: "Favor de introducir estatus"}
    ]
  }

  fg: any = undefined;
  fge: any = undefined;


  constructor(
    public fb: FormBuilder, 
    private alertController: AlertController, 
    private route: Router
    ) {
    
   }
    
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (this.id) {
      this.loadData(this.id);
    }
    

    this.fg = this.fb.group(
      {
        codigo: new FormControl('', Validators.compose([ Validators.required  ])) ,
        correo: new FormControl('', Validators.compose([ Validators.required  ])) ,
        nombre: new FormControl('', Validators.compose([ Validators.required  ])) ,
        correoInstitucional: new FormControl('', Validators.compose([ Validators.required  ])) ,
        admision: new FormControl('', Validators.compose([ Validators.required  ])) ,
        estatus: new FormControl('', Validators.compose([ Validators.required  ])) ,
        nivel: new FormControl('', Validators.compose([ Validators.required  ])) ,
        situacion: new FormControl('', Validators.compose([ Validators.required  ])) ,
        ciclos: new FormControl('', Validators.compose([ Validators.required  ])) ,
        ultimoCiclo: new FormControl('', Validators.compose([ Validators.required  ])) ,
        carrera: new FormControl('', Validators.compose([ Validators.required  ])) ,
        sede: new FormControl('', Validators.compose([ Validators.required  ])) ,
        creditos: new FormControl('', Validators.compose([ Validators.required  ])) ,
        promedio: new FormControl('', Validators.compose([ Validators.required  ])) ,
        

      }
    )


  }

  
  submitStudent(values:any){

    console.log(values);
    let student:IStudentRegister  = {
      codigo: values.codigo, 
      correo: values.correo, 
      nombre: values.nombre,
      correoInstitucional: values.correoInstitucional,
      admision: values.admision,
      estatus: values.estatus,
      nivel: values.nivel, 
      situacion: values.situacion,
      ciclos: Number(values.ciclos),
      ultimoCiclo: values.ultimoCiclo,
      carrera: values.carrera,
      sede: values.sede,    
      creditos: Number(values.creditos),    
      promedio: Number(values.promedio)    
   };
   this.isWaiting=true;
   this.bdservice.register(student)
   .then(response=>{
     this.isWaiting=false;
     // console.log(response);
     this.presentAlert('El estudiante quedo registrado correctamente.');
     this.route.navigate(['/', 'estudiantes']);

   })
   .catch(err=>{
     this.isWaiting=false;
     this.presentAlert('Error al tratar de grabar');
   });
 }
 
 
 async presentAlert(message: string = '', header:string = 'Registro', subHeader: string = '' , buttons: Array<any> = ['Ok']) {
  const alert = await this.alertController.create({
    header,
    subHeader,
    message,
    buttons,
  });

  await alert.present();
}


  

  loadData(id: string){
    if (id) {

      
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


