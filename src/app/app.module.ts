// File to bind all modules and components
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppComponent }  from './app.component';
import { UserComponent }  from './components/user.component';
import { AboutComponent }  from './components/about.component';
import { HomeComponent }  from './components/home.component';

import {routing} from './app.routing'

import { HttpModule }  from '@angular/http';
import {PaymentComponent} from "./components/payment.component";
import {TransactionComponent} from "./components/transaction.component";

@NgModule({
  imports:      [ BrowserModule,FormsModule,ReactiveFormsModule, HttpModule,routing ],
  declarations: [ AppComponent,UserComponent,AboutComponent,HomeComponent,PaymentComponent,TransactionComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
