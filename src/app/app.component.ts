import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
//import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { peopleOutline, peopleSharp, listOutline, listSharp, barChartOutline, barChartSharp, exitOutline, exitSharp, personAddOutline, personAddSharp} from 'ionicons/icons';

import  {AuthserviceService}  from './shared'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  isAdmin: boolean = false;
  auth: AuthserviceService = inject(AuthserviceService)

  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail', visible: true },
  ];
  constructor() {
    addIcons({ peopleOutline, personAddOutline, personAddSharp, peopleSharp, listOutline, listSharp, barChartOutline, barChartSharp, exitOutline, exitSharp});
  }

  ngOnInit(): void {
    this.isAdmin = this.auth.getIsAdmin();
    this.appPages =  [
      { title: 'Estudiantes', url: '/estudiantes', icon: 'people', visible: true },
      { title: 'Registrar', url: '/registro', icon: 'person-add' , visible: true},
      { title: 'Calificaciones', url: '/calificaciones', icon: 'bar-chart' , visible: true},
      { title: 'Usuarios', url: '/usuarios', icon: 'people' , visible: this.isAdmin},
      { title: 'Salir', url: '/login', icon: 'exit' , visible: true}
    ];
  }


}
