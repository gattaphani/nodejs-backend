import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SaveComponent } from './save/save.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = 
[
  {
    path:'', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path:'login',component:SigninComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'list',component:ListComponent, canActivate: [AuthGuard]
  },
  {
    path:'edit/:id',component:SaveComponent, canActivate: [AuthGuard]
    
  },
  {
    path:'add',component:SaveComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
