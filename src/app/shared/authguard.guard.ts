import { CanActivateFn } from '@angular/router';
import { AuthserviceService } from './index';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const AuthguardGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  
  return (AuthserviceService.isLoggedIn ||  router.navigate(['login']));
};
