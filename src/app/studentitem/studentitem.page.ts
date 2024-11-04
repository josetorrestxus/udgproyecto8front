import { Component, OnInit, inject } from '@angular/core';
import { InfiniteScrollCustomEvent, SegmentChangeEventDetail } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

//own 
import { BdServiceService } from '../shared';
import { IObjectMap, IData, ITableData } from '../shared/interfaces';
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
  templateUrl: './studentitem.page.html',
  styleUrls: ['./studentitem.page.scss'],
  standalone: true,
  imports: [
    IonImg, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonCol, IonButton, IonInput, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,
    IonSpinner, IonFooter, ReactiveFormsModule, IonRow, IonGrid, IonLabel, IonRow, IonInfiniteScroll, IonSegmentButton, IonSearchbar, IonSegment, IonInfiniteScrollContent
  ]
})
export class StudentItemPage implements OnInit {
  
  private bdservice = inject(BdServiceService)
  private activatedRoute = inject(ActivatedRoute);

  section: string = "student";
  id: string = "";
  stName: string = "detalle";
  data: object =  {};
  codigo: string = '';
  itemsStudent: Array<IObjectMap>  = [];

  calificacionesHeaders:Array<ITableData> = StudentFields_Calificaciones;
  calificaciones: Array<object> = [];

  constructor() {
    
   }
    
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadData(this.id);
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


