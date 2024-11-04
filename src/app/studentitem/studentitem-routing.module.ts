import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentItemPage } from './studentitem.page';

const routes: Routes = [
  {
    path: '',
    component: StudentItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
