import { Routes } from '@angular/router';
import { AuthguardGuard } from './shared'


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then( m => m.FolderPage),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'estudiantes',
    loadComponent: () => import('./student/student.page').then( m => m.StudentPage),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'student/:id',
    loadComponent: () => import('./studentitem/studentitem.page').then( m => m.StudentItemPage),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'registro',
    loadComponent: () => import('./registerstudent/registerstudent.page').then( m => m.RegisterstudentItemPage),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'calificaciones',
    loadComponent: () => import('./grades/grades.page').then( m => m.GradesItemPage),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./user/user.page').then( m => m.UserPage),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];



