import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';



@NgModule({
  declarations: [NavBarComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports: [
    NavBarComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
