/**
 * Created by deepak.kumar2 on 3/8/2017.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import   {UserComponent } from  './components/user.component';
import   {AboutComponent } from  './components/about.component';
import   {HomeComponent } from  './components/home.component';
import   {PaymentComponent } from  './components/payment.component';
import   {TransactionComponent } from  './components/transaction.component';

const  appRoutes: Routes =[
  {
    path:'',
    component: UserComponent
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'payment',
    component: PaymentComponent
  },{
    path: 'transaction',
    component: TransactionComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


